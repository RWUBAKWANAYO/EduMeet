import { IMeetingMessage } from "../types/meeting.interface";
import MeetingChat from "../models/meeting.chat.model";
import MeetingRoom from "../models/meeting.room.model";
import { ErrorFormat } from "../utils";
import mongoose from "mongoose";

interface IMeetingChatArg {
	roomId: mongoose.Types.ObjectId | string;
	chatType?: "single" | "group";
	members?: string[];
}

const newSingleChat = async ({ roomId, members }: IMeetingChatArg) => {
	if (!members || members.length !== 2) {
		throw new ErrorFormat(`A single chat must have exactly 2 members`, 400);
	}

	const memberIds = members.map((member) => new mongoose.Types.ObjectId(member));
	const chatQuery = {
		room_id: new mongoose.Types.ObjectId(roomId),
		chat_type: "single",
		members: { $all: memberIds },
	};

	try {
		const existingChat = await MeetingChat.findOne(chatQuery).populate({
			path: "members",
			select: " full_name photo",
		});
		if (existingChat) return existingChat;

		const newChat = await MeetingChat.create(chatQuery);
		return await newChat.populate({
			path: "members",
			select: " full_name photo",
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

const newGroupChat = async (roomId: string) => {
	const chatQuery = {
		room_id: new mongoose.Types.ObjectId(roomId),
		chat_type: "group",
	};

	try {
		const existingChat = await MeetingChat.findOne(chatQuery).populate({
			path: "members",
			select: " full_name photo",
		});
		if (existingChat) return existingChat;

		const newChat = await MeetingChat.create(chatQuery);
		return newChat;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createMeetingChat = async ({ roomId, chatType, members }: IMeetingChatArg) => {
	try {
		const meetingRoom = await MeetingRoom.findById(roomId);
		if (!meetingRoom) throw new ErrorFormat(`Meeting room with id ${roomId} not found`, 404);

		if (chatType === "single") return newSingleChat({ roomId, members });

		return newGroupChat(roomId as string);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateLatestMessage = async (message: IMeetingMessage) => {
	try {
		const updatedChat = await MeetingChat.findById(message.chat);

		if (!updatedChat) throw new Error(`Chat with id ${message.chat} not found`);

		updatedChat.latestMessage = {
			sender: message.sender,
			content: message.content,
		};
		await updatedChat.save();
		return updatedChat;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
