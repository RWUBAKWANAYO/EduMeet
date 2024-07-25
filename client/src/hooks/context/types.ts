import { MutableRefObject } from "react";
import { IMeetingData, IMeetingRoom } from "../../types/meetings.interface";
import { IUser } from "../../types/users.interface";
import { PeerStateType } from "../reducers/meeting/peer";

export interface ITheme {
	theme: string;
	toggleTheme: () => void;
	activePage: string;
	isModalOpen: boolean;
	openModal: (content: React.ReactNode) => void;
	closeModal: () => void;
	modalContent: React.ReactNode | null;
	isDesktop: boolean;
	isMobile: boolean;
	isTablet: boolean;
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	isChatBubble: boolean;
	chatBubbleHandler: () => void;
}

export interface IUserContext {
	user: IUser | null;
	token: string | null;
	saveUser: (data: { user: IUser; token?: string }) => void;
	removeUser: () => void;
}

export interface IMeetingInvite {
	title?: string;
	message?: string;
	user: IUser;
	sender: "host" | "participant";
	meetingRoomId: string;
}

export interface IStreamTrack {
	audio: boolean;
	video: boolean;
}

export interface PeerInterface {
	host: string;
	port: number | undefined;
	secure: boolean;
	path: string;
}

export interface IPeer {
	stream?: MediaStream;
	user: IUser;
	streamTrack: IStreamTrack;
}

export interface IMeetingRoomContext {
	meetingRoomId: string;
	setMeetingRoomId: React.Dispatch<React.SetStateAction<string>>;
	stream: MediaStream | undefined;
	peers: PeerStateType;
	leaveRoomHandler: () => void;
	handleMeetingRoom: (room: IMeetingRoom) => void;
	screenStream: MediaStream | undefined;
	screenSharingId: string;
	shareScreenHandler: () => void;
	toggleTrack: (type: "video" | "audio") => void;
	streamTrack: IStreamTrack;
	meetingInfo: MutableRefObject<IMeetingData | null>;
	inviteUsersToMeetingRoom: (users: IUser[]) => void;
	screenRecordingHandler: (recordingAction: "start_recording" | "stop_recording") => void;
}

export interface IScreenRecorder {
	startTime?: moment.Moment | null;
	elapsedTime?: string;
	startRecording?: () => void;
	stopRecording?: () => void;
	isLoading?: boolean;
}

export interface IMeetingRoomMessage {
	_id?: string;
	user: IUser;
	content: string;
	timestamp: Date;
}

export interface IFetchChatData {
	chatType: "single" | "group";
	roomId?: string;
	participants?: string[];
	chatTab?: "peers" | "chat";
	memberId?: string;
}
