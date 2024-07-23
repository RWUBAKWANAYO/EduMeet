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
const meeting_stats_controller_1 = require("../../controllers/meeting.stats.controller");
const meetingRoomHandler = (io, socket) => {
    const requestJoinMeetingHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ meeting, user }) {
        if (!meeting || !user)
            return;
        const room = yield (0, meeting_room_controller_1.checkExistMeetingRoom)(+meeting.session_id);
        if (!room)
            return;
        const userId = user._id.toString();
        socket.join(userId);
        socket.to(`${room._id}`).emit("user-request-to-join-room", {
            reqUser: user,
            meeting,
            roomId: `${room._id}`,
        });
    });
    const acceptJoinRequestHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, user }) {
        if (!roomId || !user)
            return;
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        socket.to(userId).emit("join-request-accepted", { user, roomId });
    });
    const rejecttJoinRequestHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user }) {
        if (!user)
            return;
        const userId = user === null || user === void 0 ? void 0 : user._id.toString();
        socket.to(userId).emit("join-request-rejected");
    });
    const joinRoomHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, user }) {
        if (!roomId || !user)
            return;
        const room = yield (0, meeting_room_controller_1.joinMeetingRoom)(roomId, user._id.toString());
        if (!room)
            return;
        if (room.status === "not_found")
            return socket.emit("get-meeting-room", "not_found");
        yield (0, meeting_stats_controller_1.updateMeetingStats)({
            action: "join_meeting",
            roomId: `${room._id}`,
            userId: `${user._id}`,
        });
        socket.join(roomId);
        socket.to(roomId).emit("user-joined-meeting-room", user);
        socket.emit("get-meeting-room", room);
    });
    const leaveRoomHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, peerId }) {
        if (!roomId || !peerId)
            return;
        yield (0, meeting_room_controller_1.removeAttendee)(roomId, peerId);
        yield (0, meeting_stats_controller_1.updateMeetingStats)({
            action: "leave_meeting",
            roomId,
            userId: peerId,
        });
        socket.to(roomId.toString()).emit("user-left-meeting-room", peerId);
    });
    const startSharingHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, peerId }) {
        if (!roomId || !peerId)
            return;
        yield (0, meeting_stats_controller_1.updateMeetingStats)({
            action: "start_sharing",
            roomId,
            userId: peerId,
        });
        socket.to(roomId.toString()).emit("user-start-sharing", peerId);
    });
    const stopSharingHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, peerId }) {
        if (!roomId || !peerId)
            return;
        yield (0, meeting_stats_controller_1.updateMeetingStats)({
            action: "stop_sharing",
            roomId,
            userId: peerId,
        });
        socket.to(roomId.toString()).emit("user-stop-sharing", peerId);
    });
    const streamTrackHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, streamType, peerId, streamTrack }) {
        if (!roomId || !peerId || !streamTrack)
            return;
        const data = {
            roomId,
            userId: peerId,
        };
        if (streamType === "video") {
            data.action = streamTrack.video === false ? "video_muted" : "video_unmuted";
        }
        else {
            data.action = streamTrack.audio === false ? "audio_muted" : "audio_unmuted";
        }
        yield (0, meeting_stats_controller_1.updateMeetingStats)(data);
        socket.to(roomId.toString()).emit("user-change-stream-track", { peerId, streamTrack });
    });
    const screenRecordingHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, peerId, recordingAction }) {
        if (!roomId || !peerId || !recordingAction)
            return;
        return yield (0, meeting_stats_controller_1.updateMeetingStats)({
            action: recordingAction,
            roomId,
            userId: peerId,
        });
    });
    const inviteUsersHandler = ({ roomId, sender, users }) => {
        if (!roomId || !sender || !users)
            return;
        users.forEach((user) => {
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
    socket.on("screen-recording", screenRecordingHandler);
    socket.on("invite-users-to-meeting-room", inviteUsersHandler);
    (0, meeting_chat_1.meeitngChatsHandler)(io, socket);
};
exports.meetingRoomHandler = meetingRoomHandler;
