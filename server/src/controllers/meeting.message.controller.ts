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
  } catch (error) {
    console.log(error);
  }
};
