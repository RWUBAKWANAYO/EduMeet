import { Server, Socket } from "socket.io";
import {
  checkExistMeetingRoom,
  joinMeetingRoom,
  removeAttendee,
} from "../../controllers/meeting.room.controller";
import { IUser } from "../../types/user.interface";
import { meeitngChatsHandler } from "./meeting.chat";
import { IMeeting } from "../../types/meeting.interface";
import { createMeetingChat } from "../../controllers/meeting.chat.controller";

export interface IMeetingRoom {
  peerId: string;
  meeting: IMeeting;
  roomId: string;
  user: IUser;
  userId: string;
  streamTrack: { audio: boolean; video: boolean };
  users: IUser[];
  sender: IUser;
}
export const meetingRoomHandler = (io: Server, socket: Socket) => {
  const requestJoinMeetingHandler = async ({ meeting, user }: IMeetingRoom) => {
    if (!meeting || !user) return;
    const room = await checkExistMeetingRoom(+meeting.session_id);
    console.log(room, "room....");
    if (!room) return;
    const userId = user._id.toString();
    socket.join(userId);
    socket.to(`${room._id}`).emit("user-request-to-join-room", {
      reqUser: user,
      meeting: meeting,
      roomId: `${room._id}`,
    });
  };

  const acceptJoinRequestHandler = async ({ roomId, user }: IMeetingRoom) => {
    if (!roomId || !user) return;
    const userId = user?._id.toString();
    socket.to(userId).emit("join-request-accepted", { user, roomId });
  };
  const rejecttJoinRequestHandler = async ({ user }: IMeetingRoom) => {
    if (!user) return;
    const userId = user?._id.toString();
    socket.to(userId).emit("join-request-rejected");
  };

  const joinRoomHandler = async ({ roomId, user }: IMeetingRoom) => {
    if (!roomId || !user) return;
    const room = await joinMeetingRoom(roomId, user._id.toString());
    if (!room) return;
    const groupChats = await createMeetingChat({
      roomId,
      chatType: "group",
    });
    if (!groupChats) return;

    socket.join(roomId);
    socket.to(roomId).emit("user-joined-meeting-room", user);
    socket.emit("get-meeting-room", room);
    socket.emit("get-meeting-group-chats", groupChats);
  };

  const leaveRoomHandler = async ({ roomId, peerId }: IMeetingRoom) => {
    if (!roomId || !peerId) return;
    await removeAttendee(roomId, peerId);
    socket.to(roomId.toString()).emit("user-left-meeting-room", peerId);
  };

  const startSharingHandler = ({ roomId, peerId }: IMeetingRoom) => {
    if (!roomId || !peerId) return;
    socket.to(roomId.toString()).emit("user-start-sharing", peerId);
  };

  const stopSharingHandler = ({ roomId, peerId }: IMeetingRoom) => {
    if (!roomId || !peerId) return;
    socket.to(roomId.toString()).emit("user-stop-sharing", peerId);
  };

  const streamTrackHandler = ({ roomId, peerId, streamTrack }: IMeetingRoom) => {
    if (!roomId || !peerId || !streamTrack) return;
    socket.to(roomId.toString()).emit("user-change-stream-track", { peerId, streamTrack });
  };

  const inviteUsersHandler = ({ roomId, sender, users }: IMeetingRoom) => {
    if (!roomId || !sender || !users) return;
    users.forEach((user: IUser) => {
      socket
        .to(user._id.toString())
        .emit("invited-to-meeting-room", { meetingRoomId: roomId, sender });
    });
  };

  socket.on("request-join-meeting-room", requestJoinMeetingHandler);
  socket.on("accept-user-join-request", acceptJoinRequestHandler);
  socket.on("reject-user-join-request", rejecttJoinRequestHandler);
  socket.on("join-meeting-room", joinRoomHandler);
  socket.on("start-sharing", startSharingHandler);
  socket.on("stop-sharing", stopSharingHandler);
  socket.on("leave-meeting-room", leaveRoomHandler);
  socket.on("change-stream-track", streamTrackHandler);
  socket.on("invite-users-to-meeting-room", inviteUsersHandler);

  meeitngChatsHandler(io, socket);
};
