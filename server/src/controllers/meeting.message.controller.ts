import { ErrorFormat } from "../utils";
import MeetingMessage from "../models/meeting.message.model";
import { IMeetingMessage } from "../types/meeting.interface";
import { updateLatestMessage } from "./meeting.chat.controller";

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
