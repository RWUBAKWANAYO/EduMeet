import { Request, Response, NextFunction } from "express";
import Meeting from "../models/meeting.model";
import User from "../models/user.model";
import MeetingRoom from "../models/meeting.room.model";
import { ErrorFormat, asyncErrorHandler, getMeetingStatus } from "../utils";
import { IMeetingRoom } from "../types/meeting.interface";
import moment from "moment";
import { createMeetingStats } from "./meeting.stats.controller";
import { IUser } from "../types/user.interface";
import mongoose from "mongoose";

export const checkExistMeetingRoom = async (sessionId: number) => {
	try {
		const meetingRoom = await MeetingRoom.findOne({ session_id: +sessionId }).populate("meeting");
		if (meetingRoom) return meetingRoom;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const instantMeetingHandler = async (sessionId: number, res: Response, next: NextFunction) => {
	try {
		const existingPMI = await User.findOne({
			pmi: +sessionId,
		});
		if (!existingPMI) {
			return next(new ErrorFormat(`Personal meeting with id ${sessionId} not found`, 404));
		}
		const meetingRoom: IMeetingRoom = await MeetingRoom.create({
			meeting_type: "instant",
			session_id: +sessionId,
		});
		return res.status(200).json({
			status: "success",
			data: meetingRoom,
		});
	} catch (error: any) {
		next(new ErrorFormat(error.message, 500));
	}
};

export const createMeetingRoom = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { sessionId, passcode, userId, meetingType } = req.body;

		if (meetingType === "instant") return await instantMeetingHandler(sessionId, res, next);
		const meeting = await Meeting.findOne({ session_id: sessionId }).populate("participants");

		if (!meeting) return next(new ErrorFormat(`Meeting with id ${sessionId} not found`, 404));

		const meetingStatus = getMeetingStatus(meeting.start_time, meeting.end_time);
		if (meeting.status !== meetingStatus) {
			meeting.status = meetingStatus;
			await meeting.save();
		}

		if (meeting.status === "ended") return next(new ErrorFormat("Meeting has ended", 400));

		if (meeting.passcode_required && passcode !== meeting.passcode) {
			return next(new ErrorFormat("Please provide a valid passcode", 400));
		}

		if (!meeting.waiting_room && (!userId || meeting.host.toString() !== userId)) {
			if (meetingStatus === "upcoming") {
				return res.status(200).json({
					waiting_room: false,
					meeting,
				});
			}
		}

		if (meeting.require_confirm && (!userId || meeting.host.toString() !== userId)) {
			return res.status(200).json({
				require_confirm: true,
				meeting,
			});
		}

		const existingRoom = await checkExistMeetingRoom(sessionId);
		if (existingRoom) {
			await createMeetingStats({
				roomId: `${existingRoom._id}`,
				meetingId: meeting._id as any,
				userId,
				participants: [meeting.host, ...meeting.participants] as any,
			});
			return res.status(200).json({
				status: "success",
				data: existingRoom,
			});
		}

		const meetingRoom = await MeetingRoom.create({
			meeting_type: "scheduled",
			session_id: +sessionId,
			meeting: meeting._id,
		});
		if (!meetingRoom) throw new Error("Fail to create meeting room");
		await createMeetingStats({
			roomId: `${meetingRoom._id}`,
			meetingId: `${meeting._id}`,
			userId,
			participants: [meeting.host, ...meeting.participants] as any,
		});

		return res.status(200).json({
			status: "success",
			data: meetingRoom,
		});
	}
);

const populateMeetingRoom = async (
	meetingRoom: IMeetingRoom,
	res: Response,
	next: NextFunction
) => {
	try {
		meetingRoom = await meetingRoom.populate({
			path: "attendees",
			select: "full_name photo",
		});

		meetingRoom = await meetingRoom.populate({
			path: "meeting",
			populate: [
				{
					path: "participants",
					select: "full_name photo",
				},
				{
					path: "host",
					select: "full_name photo",
				},
			],
		});
		return res.status(200).json({
			status: "success",
			data: meetingRoom,
		});
	} catch (error: any) {
		return next(new ErrorFormat(error.message, 500));
	}
};

export const joinMeetingRoom =
	// asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { roomId } = req.params;
		const existUser = req.user as IUser;

		if (!mongoose.Types.ObjectId.isValid(roomId)) {
			return next(new ErrorFormat(`Invalid meeting room id ${roomId}`, 400));
		}
		const meetingRoom = await MeetingRoom.findById(roomId).exec();

		if (!meetingRoom) return next(new ErrorFormat(`Meeting room with id ${roomId} not found`, 404));

		const isAttendeeExist = meetingRoom.attendees.some(
			(attendee) => attendee.toString() === existUser._id.toString()
		);
		if (isAttendeeExist) {
			return await populateMeetingRoom(meetingRoom, res, next);
		}

		meetingRoom.attendees.push(existUser._id);
		await meetingRoom.save();
		return await populateMeetingRoom(meetingRoom, res, next);
	};
// );

export const removeAttendee = async (roomId: string, userId: string) => {
	try {
		const meetingRoom = await MeetingRoom.findById(roomId);
		if (!meetingRoom) {
			throw new Error(`Meeting room with id ${roomId} not found`);
		}
		const newAttendees = meetingRoom.attendees.filter((attendee) => attendee.toString() !== userId);
		if (newAttendees.length === 0) {
			const updatedMeeting = await Meeting.findOne({ session_id: meetingRoom.session_id });
			if (
				meetingRoom.meeting_type === "scheduled" &&
				updatedMeeting &&
				moment(updatedMeeting.end_time).isBefore(moment())
			) {
				updatedMeeting.status = "ended";
				await updatedMeeting.save();
			}
			if (meetingRoom.meeting_type === "instant") {
				await MeetingRoom.findOneAndDelete({ session_id: meetingRoom.session_id });
			}
		}
		meetingRoom.attendees = newAttendees;
		await meetingRoom.save();
		return meetingRoom;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
