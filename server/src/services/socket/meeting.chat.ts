import { Server, Socket } from "socket.io";
import { createMeetingChat } from "../../controllers/meeting.chat.controller";
import { IMeetingMessage } from "../../types/meeting.interface";
import { sendMeetingMessage } from "../../controllers/meeting.message.controller";

export interface IMeetingChat {
  roomId: string;
  message: IMeetingMessage;
  chatType: "group" | "single";
  chatId?: string;
  participants: string[];
}
export const meeitngChatsHandler = (_io: Server, socket: Socket) => {
  const messageHandler = async ({ roomId, message, chatType }: IMeetingChat) => {
    const newMessage = await sendMeetingMessage(message);
    if (!newMessage) return;
    if (chatType === "group") {
      return socket.to(roomId.toString()).emit("meeting-group-message-received", message);
    }
    return socket.to(roomId.toString()).emit("meeting-single-chat-message-received", message);
  };

  const joinSingleRoomHandler = async ({ roomId, participants }: IMeetingChat) => {
    const chat = await createMeetingChat({ roomId, chatType: "single", members: participants });
    if (!chat || !chat._id) return;
    const chatId = chat._id.toString();
    socket.join(chatId);
    socket.emit("meeting-single-room-joined", chat);
  };

  socket.on("send-meeting-message", messageHandler);
  socket.on("join-meeting-chat-single-room", joinSingleRoomHandler);
};
