"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingRoomHandler = void 0;
const meeting_room_controller_1 = require("../../controllers/meeting.room.controller");
const meeting_chat_1 = require("./meeting.chat");
const meeting_chat_controller_1 = require("../../controllers/meeting.chat.controller");
const meetingRoomHandler = (io, socket) => {
    const requestJoinMeetingHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ meeting, user }) {
        const meetingId = (meeting === null || meeting === void 0 ? void 0 : meeting.session_id) ? meeting.session_id.toString() : "";
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        socket.join(userId);
        socket
            .to(meetingId.toString())
            .emit("user-request-to-join-room", { reqUser: user, meeting: meeting });
    });
    const acceptJoinRequestHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, user }) {
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        socket.to(userId).emit("join-request-accepted", { user, roomId });
    });
    const rejecttJoinRequestHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, user }) {
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        socket.to(userId).emit("join-request-rejected", { user, roomId });
    });
    const joinRoomHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, user }) {
        if (!roomId || !user)
            return;
        const room = yield (0, meeting_room_controller_1.joinMeetingRoom)(roomId, user._id.toString());
        if (!room)
            return;
        const groupChats = yield (0, meeting_chat_controller_1.createMeetingChat)({
            roomId,
            chatType: "group",
        });
        if (!groupChats)
            return;
        socket.join(roomId);
        socket.to(roomId).emit("user-joined-meeting-room", user);
        socket.emit("get-meeting-room", room);
        socket.emit("get-meeting-group-chats", groupChats);
    });
    const leaveRoomHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, peerId }) {
        if (!roomId || !peerId)
            return;
        yield (0, meeting_room_controller_1.removeAttendee)(roomId, peerId);
        socket.to(roomId.toString()).emit("user-left-meeting-room", peerId);
    });
    const startSharingHandler = ({ roomId, peerId }) => {
        if (!roomId || !peerId)
            return;
        socket.to(roomId.toString()).emit("user-start-sharing", peerId);
    };
    const stopSharingHandler = ({ roomId, peerId }) => {
        if (!roomId || !peerId)
            return;
        socket.to(roomId.toString()).emit("user-stop-sharing", peerId);
    };
    const streamTrackHandler = ({ roomId, peerId, streamTrack }) => {
        if (!roomId || !peerId || !streamTrack)
            return;
        socket.to(roomId.toString()).emit("user-change-stream-track", { peerId, streamTrack });
    };
    const inviteUsersHandler = ({ roomId, sender, users }) => {
        if (!roomId || !sender || !users)
            return;
        users.forEach((user) => {
            socket.to(user._id.toString()).emit("invited-to-meeting-room", { roomId, sender });
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
    (0, meeting_chat_1.meeitngChatsHandler)(io, socket);
};
exports.meetingRoomHandler = meetingRoomHandler;
