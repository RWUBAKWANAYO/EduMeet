import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler, ErrorFormat } from "../utils";
import MeetingStats from "../models/meeting.stats.model";
import mongoose from "mongoose";
import Meeting from "../models/meeting.model";

export interface IUpdateStats {
	roomId: string | mongoose.Types.ObjectId;
	userId: string;
	meetingId?: string | mongoose.Types.ObjectId;
	participants?: mongoose.Types.ObjectId[];
	action?:
		| "join_meeting"
		| "leave_meeting"
		| "audio_muted"
		| "audio_unmuted"
		| "video_muted"
		| "video_unmuted"
		| "start_sharing"
		| "stop_sharing"
		| "start_recording"
		| "stop_recording";
}
export const createMeetingStats = async ({ roomId, meetingId, participants }: IUpdateStats) => {
	if (!participants || !roomId || !meetingId) return;
	try {
		const existingStats = await MeetingStats.findOne({ room: roomId });
		if (existingStats) return existingStats;

		const stats = participants.map((participant) => ({
			room: roomId,
			meeting: meetingId,
			user: participant,
		}));

		const meetingStats = await MeetingStats.insertMany(stats);
		// if (!meetingStats) throw new Error("Failed to create meeting stats");

		return meetingStats;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateMeetingStats = async ({ action, roomId, userId }: IUpdateStats) => {
	if (!roomId || !action || !userId) return;
	try {
		const stats = await MeetingStats.findOne({ room: roomId, user: userId });
		if (!stats) return;
		stats.presence = true;
		switch (action) {
			case "join_meeting":
				stats.attendances.push({ start_time: new Date() });
				break;
			case "leave_meeting":
				stats.attendances[stats.attendances.length - 1].end_time = new Date();
				break;
			case "audio_unmuted":
				stats.audio_muted.push({ start_time: new Date() });
				break;
			case "audio_muted":
				stats.audio_muted[stats.audio_muted.length - 1].end_time = new Date();
				break;
			case "video_unmuted":
				stats.video_muted.push({ start_time: new Date() });
				break;
			case "video_muted":
				stats.video_muted[stats.video_muted.length - 1].end_time = new Date();
				break;
			case "start_sharing":
				stats.screen_sharing.push({ start_time: new Date() });
				break;
			case "stop_sharing":
				stats.screen_sharing[stats.screen_sharing.length - 1].end_time = new Date();
				break;
			case "start_recording":
				stats.recordings.push({ start_time: new Date() });
				break;
			case "stop_recording":
				stats.recordings[stats.recordings.length - 1].end_time = new Date();
				break;
			default:
				return stats;
		}
		await stats.save();
		return stats;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const userMeetingStatsCount = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user?._id?.toString();

		const counts = await Promise.all([
			MeetingStats.countDocuments({ user: userId, presence: true }),
			MeetingStats.countDocuments({ user: userId, presence: false }),
			MeetingStats.countDocuments({
				user: userId,
				"recordings.0": { $exists: true },
			}),
		]);

		const [attendedCount, missedCount, recordingsCount] = counts;

		return res.status(200).json({
			status: "success",
			data: {
				attended: attendedCount,
				missed: missedCount,
				recordings: recordingsCount,
			},
		});
	}
);

export const fiterMeetingStats = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.user?._id?.toString();
		const { roomId, meetingId } = req.query;
		const existMeeting = await Meeting.findOne({ _id: meetingId });
		if (!existMeeting) next(new ErrorFormat("Meeting not found", 404));
		const query: any = {};

		if (existMeeting?.host.toString() !== userId) query.user = userId;
		if (roomId) query.room = roomId;
		if (meetingId) query.meeting = meetingId;

		const stats = await MeetingStats.find(query)
			.populate("room")
			.populate({
				path: "meeting",
				populate: [
					{
						path: "participants",
						select: " full_name photo",
					},
					{
						path: "host",
						select: " full_name photo",
					},
				],
			})
			.populate({
				path: "user",
				select: "full_name email photo",
			});

		if (stats.length === 0) return next(new ErrorFormat("No stats found", 404));

		return res.status(200).json({
			status: "success",
			data: stats,
		});
	}
);
