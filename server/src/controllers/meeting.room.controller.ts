import { Request, Response, NextFunction } from "express";
import Meeting from "../models/meeting.model";
import User from "../models/user.model";
import MeetingRoom from "../models/meeting.room.model";
import { ErrorFormat, asyncErrorHandler, getMeetingStatus } from "../utils";
import { IMeetingRoom } from "../types/meeting.interface";

export const checkExistMeetingRoom = async (sessionId: number) => {
  try {
    const meetingRoom = await MeetingRoom.findOne({ session_id: +sessionId }).populate("meeting");
    if (meetingRoom) return meetingRoom;
  } catch (error) {
    console.log(error);
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
    return res.status(200).json({
      status: "success",
      data: meetingRoom,
    });
  }
);

export const joinMeetingRoom = async (sessionId: number, userId: string) => {
  try {
    const meetingRoom = await MeetingRoom.findOne({ session_id: +sessionId }).populate({
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
    });

    if (!meetingRoom) throw new Error(`Meeting room with id ${sessionId} not found`);

    const existUser = await User.findById(userId);
    if (!existUser) throw new Error(`User with id ${userId} not found`);

    const isAttendeeExist = meetingRoom.attendees.find((attendee) => {
      return attendee.toString() === userId;
    });

    if (isAttendeeExist)
      return await meetingRoom.populate({
        path: "attendees",
        select: " full_name photo",
      });

    meetingRoom.attendees.push(existUser._id);

    await meetingRoom.save();

    return await meetingRoom.populate({
      path: "attendees",
      select: " full_name photo",
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAttendee = async (roomId: number, userId: string) => {
  try {
    const meetingRoom = await MeetingRoom.findById(roomId);
    if (!meetingRoom) {
      throw new Error(`Meeting room with id ${roomId} not found`);
    }
    const newAttendees = meetingRoom.attendees.filter((attendee) => attendee.toString() !== userId);
    if (newAttendees.length === 0) {
      await MeetingRoom.findByIdAndDelete(roomId);
      const updatedMeeting = await Meeting.findOne({ session_id: meetingRoom.session_id });
      if (updatedMeeting) {
        updatedMeeting.status = "ended";
        await updatedMeeting.save();
      }
      return [];
    }
    meetingRoom.attendees = newAttendees;
    await meetingRoom.save();
    return meetingRoom;
  } catch (error) {
    console.log(error);
  }
};
