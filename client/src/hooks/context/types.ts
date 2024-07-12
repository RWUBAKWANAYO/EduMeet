import { MutableRefObject } from "react";
import { IMeetingData } from "../../types/meetings.interface";
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
  isDesktop: () => boolean;
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
  screenStream: MediaStream | undefined;
  screenSharingId: string;
  shareScreenHandler: () => void;
  toggleTrack: (type: "video" | "audio") => void;
  streamTrack: IStreamTrack;
  meetingInfo: MutableRefObject<IMeetingData | null>;
  acceptUserJoinRequest: (user: IUser) => void;
  rejecttUserJoinRequest: (user: IUser) => void;
  inviteUsersToMeetingRoom: (users: IUser[]) => void;
}

export interface IScreenRecorder {
  startTime?: moment.Moment | null;
  elapsedTime?: string;
  startRecording?: () => void;
  stopRecording?: () => void;
}
