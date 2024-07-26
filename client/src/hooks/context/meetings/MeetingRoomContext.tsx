import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
	useCallback,
	useMemo,
	useLayoutEffect,
	useRef,
} from "react";
import { socket } from "../../../lib/socket";
import Peer from "peerjs";
import { UserContext } from "../UserContext";
import {
	PeerStateType,
	addAllPeersAction,
	addPeerStreamAction,
	addPeerTrackAction,
	addSinglePeerAction,
	peerReducer,
	removePeerAction,
} from "../../reducers/meeting/peer";
import { MeetingsContext } from "./MeetingsContext";
import { IMeetingInvite, IMeetingRoomContext, IStreamTrack, PeerInterface } from "../types";
import { IMeetingData, IMeetingRoom } from "../../../types/meetings.interface";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../types/users.interface";

export const MeetingRoomContext = createContext<IMeetingRoomContext>({} as IMeetingRoomContext);

export const MeetingRoomProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useContext(UserContext);
	const meetingInfo = useRef<IMeetingData | null>(null);
	const { setAccessRoom, setRequestToJoinData } = useContext(MeetingsContext);
	const [meetingRoomId, setMeetingRoomId] = useState<string>("");
	const [currentPeer, setCurrentPeer] = useState<Peer>();
	const [stream, setStream] = useState<MediaStream>();
	const [streamTrack, setStreamTrack] = useState<IStreamTrack>({
		audio: false,
		video: false,
	});
	const streamTrackRef = useRef<IStreamTrack>({ audio: false, video: false });
	const [screenStream, setScreenStream] = useState<MediaStream>();

	const [peers, dispatch] = useReducer<React.Reducer<PeerStateType, any>>(peerReducer, {});
	const [screenSharingId, setScreenSharingId] = useState<string>("");

	const navigate = useNavigate();

	const getUserMediaTracks = useCallback(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		stream.getTracks().forEach((track) => (track.enabled = false));
		return stream;
	}, []);

	const toggleTrack = (type: "video" | "audio") => {
		if (stream) {
			const track = stream.getTracks().find((track) => track.kind === type);
			if (track) {
				const newTrackState = !streamTrack[type];
				track.enabled = newTrackState;
				const updatedStreamTrack = { ...streamTrack, [type]: newTrackState };
				setStreamTrack(updatedStreamTrack);

				socket.emit("change-stream-track", {
					roomId: meetingRoomId,
					peerId: user?._id,
					streamTrack: updatedStreamTrack,
					streamType: type,
				});
			}
		}
	};

	const streamTrackHandler = useCallback(
		({ peerId, streamTrack }: { peerId: string; streamTrack: IStreamTrack }) => {
			dispatch(addPeerTrackAction(peerId, streamTrack));
		},
		[dispatch]
	);

	const handleMeetingRoom = useCallback(
		(room: IMeetingRoom) => {
			meetingInfo.current = room.meeting!;
			dispatch(addAllPeersAction(room.attendees));
			socket.emit("join-meeting-room", { room, user });
		},
		[dispatch]
	);

	const handleUserJoined = useCallback(
		(peeredUser: IUser) => {
			console.log("user joined....");
			if (!currentPeer || !stream || !streamTrackRef.current) return;
			dispatch(addSinglePeerAction(peeredUser));
			const call = currentPeer.call(peeredUser._id, stream, {
				metadata: { calledUser: user, calledTrack: streamTrackRef.current },
			});
			call?.on("stream", (peerStream) => {
				dispatch(addPeerStreamAction(peeredUser._id, peerStream));
			});
		},
		[currentPeer, stream, dispatch]
	);

	const handleCall = useCallback(
		(call: any) => {
			console.log("handle call....");
			const { calledUser, calledTrack } = call.metadata;
			if (!calledUser || !calledTrack) return;
			dispatch(addSinglePeerAction(calledUser));
			call.answer(stream!);
			call.on("stream", (peerStream: MediaStream) => {
				dispatch(addPeerStreamAction(call.peer, peerStream));
				dispatch(addPeerTrackAction(calledUser._id, calledTrack));
			});
		},
		[stream, dispatch]
	);

	const leaveRoomHandler = useCallback(() => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
		if (screenStream) {
			screenStream.getTracks().forEach((track) => track.stop());
		}
		socket.emit("leave-meeting-room", { roomId: meetingRoomId, peerId: user?._id });
		currentPeer?.disconnect();
		navigate("/");
	}, [stream, screenStream, currentPeer, meetingRoomId, user, navigate]);

	const handleUserStartSharing = useCallback((peerId: string) => {
		setScreenSharingId(peerId);
	}, []);

	const handleUserStopSharing = useCallback(() => {
		setScreenSharingId("");
	}, []);

	const switchStream = useCallback(
		(newStream: MediaStream) => {
			const connections = currentPeer?.connections;

			if (!connections) {
				console.error("No connections available in currentPeer.");
				return;
			}

			Object.values(connections).forEach((connectionArray: any) => {
				const connection = connectionArray[0];
				if (!connection || !connection.peerConnection) {
					console.error("Invalid connection or peerConnection:", connection);
					return;
				}

				const videoTrack = newStream?.getTracks().find((track) => track.kind === "video");
				const sender = connection.peerConnection
					.getSenders()
					.find((sender: any) => sender.track && sender.track.kind === "video");

				if (sender && videoTrack) {
					sender.replaceTrack(videoTrack).catch((err: any) => console.error(err));
				} else {
					console.error("No sender or videoTrack found:", { sender, videoTrack });
				}
			});

			setStream(newStream);
		},
		[currentPeer]
	);

	const handleScreenShareEnded = useCallback(
		(currentScreenStream: MediaStream = screenStream!) => {
			if (currentScreenStream) {
				currentScreenStream.getTracks().forEach((track) => track.stop());
				setScreenStream(undefined);
				setScreenSharingId("");

				socket.emit("stop-sharing", { peerId: user?._id, roomId: meetingRoomId });
			}

			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((newStream) => {
					switchStream(newStream);
				})
				.catch((error) => {
					console.error("Error accessing media devices.", error);
				});
		},
		[screenStream, switchStream, user, meetingRoomId]
	);

	const shareScreenHandler = useCallback(() => {
		if (screenSharingId) {
			handleScreenShareEnded();
		} else {
			if (!streamTrack.video) return alert("Please turn on your video");
			navigator.mediaDevices
				.getDisplayMedia({})
				.then((newStream) => {
					newStream.getTracks().forEach((track) => {
						track.addEventListener("ended", () => {
							handleScreenShareEnded(newStream);
						});
					});
					switchStream(newStream);
					setScreenStream(newStream);
					if (currentPeer) {
						setScreenSharingId(currentPeer.id);
						socket.emit("start-sharing", { peerId: currentPeer.id, roomId: meetingRoomId });
					}
				})
				.catch((error) => {
					console.error("Error accessing display media.", error);
				});
		}
	}, [screenSharingId, handleScreenShareEnded, switchStream, currentPeer, meetingRoomId]);

	const handleUserDisconnect = useCallback(
		(peerId: string) => {
			dispatch(removePeerAction(peerId));
		},
		[dispatch]
	);

	const requestTojoinRoomHandler = useCallback(
		({ reqUser, meeting, roomId }: { reqUser: IUser; meeting: IMeetingData; roomId: string }) => {
			if (meeting.host === user?._id) {
				setRequestToJoinData((prev: IMeetingInvite[]) => [
					...prev,
					{
						title: "Join Request",
						message: `${reqUser.full_name} requested to join this meeting.`,
						user: reqUser,
						sender: "participant",
						meetingRoomId: roomId,
					},
				]);
			}
		},
		[]
	);

	const inviteUsersToMeetingRoom = (receivers: IUser[]) => {
		socket.emit("invite-users-to-meeting-room", {
			roomId: meetingRoomId,
			sender: user,
			users: receivers,
		});
	};

	const screenRecordingHandler = useCallback(
		(recordingAction: "start_recording" | "stop_recording") => {
			socket.emit("screen-recording", {
				recordingAction,
				roomId: meetingRoomId,
				peerId: user?._id,
			});
		},
		[meetingRoomId]
	);

	useEffect(() => {
		setAccessRoom(null);
	}, []);
	useLayoutEffect(() => {
		if (!user) return;
		const peer = new Peer(user._id, {
			host: process.env.REACT_APP_PEERJS_HOST,
			port: process.env.REACT_APP_PEERJS_PORT,
			secure: process.env.REACT_APP_PEERJS_SECURE === "true",
			path: "/",
		} as PeerInterface);
		peer.on("open", (_id) => setCurrentPeer(peer));
		console.log("peer....", peer);
		getUserMediaTracks()
			.then((stream) => {
				setStream(stream);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		socket.on("user-start-sharing", handleUserStartSharing);
		socket.on("user-stop-sharing", handleUserStopSharing);
		socket.on("user-left-meeting-room", handleUserDisconnect);
		socket.on("user-change-stream-track", streamTrackHandler);
		socket.on("user-request-to-join-room", requestTojoinRoomHandler);

		return () => {
			socket.off("user-start-sharing", handleUserStartSharing);
			socket.off("user-stop-sharing", handleUserStopSharing);
			socket.off("user-left-meeting-room", handleUserDisconnect);
			socket.off("user-change-stream-track", streamTrackHandler);
			socket.off("user-request-to-join-room", requestTojoinRoomHandler);
		};
	}, [
		user,
		getUserMediaTracks,
		handleUserStartSharing,
		handleUserStopSharing,
		handleUserDisconnect,
	]);

	useEffect(() => {
		console.log("ON JOIN....", currentPeer, "------", stream);
		if (!currentPeer || !stream) return;
		console.log("joined and call....");
		socket.on("user-joined-meeting-room", handleUserJoined);
		currentPeer.on("call", handleCall);

		return () => {
			socket.off("user-joined-meeting-room", handleUserJoined);
			currentPeer.off("call", handleCall);
		};
	}, [currentPeer, stream]);

	useEffect(() => {
		streamTrackRef.current = streamTrack;
	}, [streamTrack]);

	const providerValue = useMemo(
		() => ({
			meetingRoomId,
			setMeetingRoomId,
			stream,
			peers,
			handleMeetingRoom,
			leaveRoomHandler,
			screenStream,
			screenSharingId,
			shareScreenHandler,
			toggleTrack,
			streamTrack,
			meetingInfo,
			inviteUsersToMeetingRoom,
			screenRecordingHandler,
		}),
		[
			meetingRoomId,
			setMeetingRoomId,
			stream,
			peers,
			handleMeetingRoom,
			leaveRoomHandler,
			screenStream,
			screenSharingId,
			shareScreenHandler,
			toggleTrack,
			streamTrack,
			meetingInfo,
			inviteUsersToMeetingRoom,
			screenRecordingHandler,
		]
	);

	return (
		<MeetingRoomContext.Provider value={providerValue}>{children}</MeetingRoomContext.Provider>
	);
};
