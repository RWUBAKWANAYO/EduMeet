import mongoose from "mongoose";
import { IMeetingRoom } from "../types/meeting.interface";

const meetingRoom = new mongoose.Schema<IMeetingRoom>(
	{
		meeting_type: {
			type: String,
			enum: ["instant", "scheduled"],
			required: [true, "meeting type (instant or scheduled) is required"],
		},
		session_id: {
			type: Number,
			required: [true, "Session ID is required"],
		},
		attendees: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		meeting: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Meeting",
			required: [
				function (this: any) {
					return this.meeting_type === "scheduled";
				},
				"Meeting ID is required for scheduled meetings.",
			],
		},
	},
	{
		timestamps: true,
	}
);

meetingRoom.pre<IMeetingRoom>("findOneAndDelete", async function (next) {
	const room = this as IMeetingRoom;
	await mongoose.models.MeetingChat.deleteMany({ room_id: room._id });
	next();
});

const MeetingRoom = mongoose.model<IMeetingRoom>("MeetingRoom", meetingRoom);
export default MeetingRoom;
