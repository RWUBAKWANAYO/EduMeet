export interface ITheme {
  theme: string;
  toggleTheme: () => void;
  activePage: string;
  isModalOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}
