import { Server, Socket } from "socket.io";
import { checkExistMeetingRoom, removeAttendee } from "../../controllers/meeting.room.controller";
import { IUser } from "../../types/user.interface";
import { meeitngChatsHandler } from "./meeting.chat";
import { IMeeting } from "../../types/meeting.interface";
import { IUpdateStats, updateMeetingStats } from "../../controllers/meeting.stats.controller";
import { IMeetingRoom as IMeetingRoomData } from "../../types/meeting.interface";
export interface IMeetingRoom {
	peerId: string;
	meeting: IMeeting;
	room: IMeetingRoomData;
	roomId: string;
	user: IUser;
	userId: string;
	streamTrack: { audio: boolean; video: boolean };
	streamType: "audio" | "video";
	users: IUser[];
	sender: IUser;
	recordingAction: "start_recording" | "stop_recording";
}
export const meetingRoomHandler = (io: Server, socket: Socket) => {
	const requestJoinMeetingHandler = async ({ meeting, user }: IMeetingRoom) => {
		if (!meeting || !user) return;
		const room = await checkExistMeetingRoom(+meeting.session_id);
		if (!room) return;
		const userId = user._id.toString();
		socket.join(userId);
		socket.to(`${room._id}`).emit("user-request-to-join-room", {
			reqUser: user,
			meeting,
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

	const joinRoomHandler = async ({ room, user }: IMeetingRoom) => {
		if (!room || !user) return;
		socket.join(`${room._id}`);
		socket.to(`${room._id}`).emit("user-joined-meeting-room", user);
	};

	const leaveRoomHandler = async ({ roomId, peerId }: IMeetingRoom) => {
		if (!roomId || !peerId) return;
		await removeAttendee(roomId, peerId);
		await updateMeetingStats({
			action: "leave_meeting",
			roomId,
			userId: peerId,
		});
		socket.to(roomId.toString()).emit("user-left-meeting-room", peerId);
	};

	const startSharingHandler = async ({ roomId, peerId }: IMeetingRoom) => {
		if (!roomId || !peerId) return;
		await updateMeetingStats({
			action: "start_sharing",
			roomId,
			userId: peerId,
		});
		socket.to(roomId.toString()).emit("user-change-stream-track", {
			peerId,
			streamTrack: {
				audio: true,
				video: true,
			},
		});
		socket.to(roomId.toString()).emit("user-start-sharing", peerId);
	};

	const stopSharingHandler = async ({ roomId, peerId }: IMeetingRoom) => {
		if (!roomId || !peerId) return;
		await updateMeetingStats({
			action: "stop_sharing",
			roomId,
			userId: peerId,
		});
		socket.to(roomId.toString()).emit("user-stop-sharing", peerId);
	};

	const streamTrackHandler = async ({ roomId, streamType, peerId, streamTrack }: IMeetingRoom) => {
		if (!roomId || !peerId || !streamTrack) return;
		const data: IUpdateStats = {
			roomId,
			userId: peerId,
		};

		if (streamType === "video") {
			data.action = streamTrack.video === false ? "video_muted" : "video_unmuted";
		} else {
			data.action = streamTrack.audio === false ? "audio_muted" : "audio_unmuted";
		}
		await updateMeetingStats(data);
		socket.to(roomId.toString()).emit("user-change-stream-track", { peerId, streamTrack });
	};

	const screenRecordingHandler = async ({ roomId, peerId, recordingAction }: IMeetingRoom) => {
		if (!roomId || !peerId || !recordingAction) return;
		return await updateMeetingStats({
			action: recordingAction,
			roomId,
			userId: peerId,
		});
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
	socket.on("screen-recording", screenRecordingHandler);
	socket.on("invite-users-to-meeting-room", inviteUsersHandler);

	meeitngChatsHandler(io, socket);
};
