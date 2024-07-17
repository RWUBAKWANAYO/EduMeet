import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../utils";
import MeetingStats from "../models/meeting.stats.model";
import mongoose from "mongoose";

interface IUpdateStats {
	roomId: string | mongoose.Types.ObjectId;
	userId: string;
	participants: mongoose.Types.ObjectId[];
	action:
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
export const createMeetingStats = async ({ roomId, participants }: IUpdateStats) => {
	try {
		const stats = participants.map((participant) => ({
			room: roomId,
			user: participant,
		}));

		const meetingStats = await MeetingStats.insertMany(stats);
		return meetingStats;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateMeetingStats = async ({ action, roomId, userId }: IUpdateStats) => {
	try {
		const stats = await MeetingStats.findOne({ room: roomId, user: userId });
		if (!stats) throw new Error("Stats not found");

		stats.presence = true;

		switch (action) {
			case "join_meeting":
				stats.attendances.push({ join_time: new Date() });
				break;
			case "leave_meeting":
				stats.attendances[stats.attendances.length - 1].leave_time = new Date();
				break;
			case "audio_muted":
				stats.audio_muted.push({ start_time: new Date() });
				break;
			case "audio_unmuted":
				stats.audio_muted[stats.audio_muted.length - 1].end_time = new Date();
				break;
			case "video_muted":
				stats.video_muted.push({ start_time: new Date() });
				break;
			case "video_unmuted":
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
