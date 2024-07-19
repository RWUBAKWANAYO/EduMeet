import { ReactNode, createContext, useEffect, useState } from "react";
import { ITheme } from "./types";
import { useLocation } from "react-router-dom";
import { capitalizeText } from "../../utils";

export const UIContext = createContext<ITheme>({} as ITheme);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// Theme related logic
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	};

	// Active page related logic
	const [activePage, setActivePage] = useState("Home");
	const location = useLocation();
	useEffect(() => {
		const path = location.pathname;

		if (path.includes("meetings/new")) return setActivePage("Schedule");
		if (path.includes("analytics")) return setActivePage("Analytics");
		let title = path.split("/")[1];
		title = title ? capitalizeText(title) : capitalizeText("Home");
		setActivePage(title);
	}, [location.pathname]);

	// modal logics
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	const openModal = (content: ReactNode) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalContent(null);
	};

	// window size helpers
	const isDesktop = () => {
		return window.innerWidth > 992;
	};

	return (
		<UIContext.Provider
			value={{
				theme,
				toggleTheme,
				activePage,
				isModalOpen,
				openModal,
				closeModal,
				modalContent,
				isDesktop,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
