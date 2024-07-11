export interface ITheme {
  theme: string;
  toggleTheme: () => void;
  activePage: string;
  isModalOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  photo?: string;
  pmi?: number;
  active?: boolean;
}

export interface IUserContext {
  user: IUser | null;
  token: string | null;
  saveUser: (data: { user: IUser; token?: string }) => void;
  removeUser: () => void;
}
