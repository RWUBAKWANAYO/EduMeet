import { Server, Socket } from "socket.io";
import { createMeetingChat } from "../../controllers/meeting.chat.controller";
import { IMeetingMessage } from "../../types/meeting.interface";
import {
  getAllMeetingMessages,
  sendMeetingMessage,
} from "../../controllers/meeting.message.controller";

export interface IMeetingChat {
  roomId: string;
  message: IMeetingMessage;
  chatType: "group" | "single";
  chatId?: string;
  participants?: string[];
}
export const meeitngChatsHandler = (_io: Server, socket: Socket) => {
  const messageHandler = async (message: IMeetingChat["message"]) => {
    const newMessage = await sendMeetingMessage(message);
    if (!newMessage) return;
    return socket.to(`${message.chat}`).emit("meeting-message-received", message);
  };

  const joinMeetingChatHandler = async ({ roomId, chatType, participants }: IMeetingChat) => {
    const chat = await createMeetingChat({ roomId, chatType, members: participants });

    if (!chat || !chat._id) return;
    const chatId = chat._id.toString();

    const messages = await getAllMeetingMessages(chatId);

    socket.join(chatId);
    socket.emit("meeting-chat-joined", {
      chat,
      messages,
    });
  };

  socket.on("send-meeting-message", messageHandler);
  socket.on("join-meeting-chat", joinMeetingChatHandler);
};
