import { IUser } from "../../types/users.interface";

export interface ITheme {
  theme: string;
  toggleTheme: () => void;
  activePage: string;
  isModalOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
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
