import mongoose from "mongoose";
import { IMeetingChat } from "../types/meeting.interface";

const MeetingChatSchema = new mongoose.Schema<IMeetingChat>(
	{
		room_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MeetingRoom",
			required: [true, "Room ID is required"],
		},
		chat_type: {
			type: String,
			enum: ["group", "single"],
			required: [true, "Chat type is required"],
		},
		members: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],

			maxlength: 2,
		},
		latestMessage: {
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			content: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

MeetingChatSchema.pre<IMeetingChat>("findOneAndDelete", async function (next) {
	const chat = this as IMeetingChat;
	await mongoose.models.MeetingMessage.deleteMany({ chat: chat._id });
	next();
});

const MeetingChat = mongoose.model<IMeetingChat>("MeetingChat", MeetingChatSchema);
export default MeetingChat;
