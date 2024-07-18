import mongoose from "mongoose";
import { IMeetingStats } from "../types/meeting.interface";

const meetingStatsSchema = new mongoose.Schema<IMeetingStats>(
	{
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MeetingRoom",
			required: [true, "Room ID is required"],
		},
		meeting: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Meeting",
			required: [true, "Meeting ID is required"],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Sender ID is required"],
		},
		presence: {
			type: Boolean,
			default: false,
		},
		attendances: {
			type: [
				{
					join_time: {
						type: Date,
					},

					leave_time: {
						type: Date,
					},
				},
			],
			default: [],
		},
		recordings: {
			type: [
				{
					start_time: {
						type: Date,
					},
					end_time: {
						type: Date,
					},
				},
			],
			default: [],
		},
		audio_muted: {
			type: [
				{
					start_time: {
						type: Date,
					},
					end_time: {
						type: Date,
					},
				},
			],
			default: [],
		},
		video_muted: {
			type: [
				{
					start_time: {
						type: Date,
					},
					end_time: {
						type: Date,
					},
				},
			],
			default: [],
		},
		screen_sharing: {
			type: [
				{
					start_time: {
						type: Date,
					},
					end_time: {
						type: Date,
					},
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const MeetingStats = mongoose.model<IMeetingStats>("MeetingStats", meetingStatsSchema);

export default MeetingStats;
