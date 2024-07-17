import { Request, Response, NextFunction } from "express";
import { asyncErrorHandler, ErrorFormat } from "../utils";
import MeetingMessage from "../models/meeting.message.model";
import { IMeetingMessage } from "../types/meeting.interface";
import { updateLatestMessage } from "./meeting.chat.controller";
import mongoose from "mongoose";

export const sendMeetingMessage = async (message: IMeetingMessage) => {
	try {
		const updatedChat = await updateLatestMessage(message);
		if (!updatedChat) return new ErrorFormat("Chat not found", 404);

		const newMessage = await MeetingMessage.create(message);
		return newMessage;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllMeetingMessages = async (chatId: string) => {
	try {
		const messages = await MeetingMessage.find({ chat: chatId }).populate({
			path: "sender",
			select: " full_name email photo",
		});
		return messages;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const countUserMessages = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user?._id?.toString();
		const messagesCount = await MeetingMessage.countDocuments({ sender: userId });

		return res.status(200).json({
			status: "success",
			data: {
				total: messagesCount,
			},
		});
	}
);
