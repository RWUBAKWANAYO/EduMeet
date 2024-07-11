import { IMeetingMessage } from "../types/meeting.interface";
import MeetingChat from "../models/meeting.chat.model";
import MeetingRoom from "../models/meeting.room.model";
import { ErrorFormat } from "../utils";
import mongoose from "mongoose";

interface IMeetingChatArg {
  roomId: mongoose.Types.ObjectId;
  chatType: "single" | "group";
  members?: string[];
}
interface IChatQuery {
  room_id: mongoose.Types.ObjectId;
  chat_type: "group" | "single";
  members?: any;
}

export const createMeetingChat = async ({ roomId, chatType, members }: IMeetingChatArg) => {
  try {
    const meetingRoom = await MeetingRoom.findById(roomId);
    if (!meetingRoom) {
      new ErrorFormat(`Meeting room with id ${roomId} not found`, 404);
      return;
    }

    let chatQuery: IChatQuery = {
      room_id: roomId,
      chat_type: chatType,
    };

    if (chatType === "single") chatQuery["members"] = { $all: members };

    const existingChat = await MeetingChat.findOne(chatQuery);
    if (existingChat) return existingChat;

    const newChat = await MeetingChat.create(chatQuery);
    return newChat;
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
