import React, { useContext } from "react";
import { Navbar } from "./shared/Navbar";
import { Sidebar } from "./shared/Sidebar";
import { Outlet } from "react-router-dom";
import { UIContext } from "../hooks/context/UIContext";

export const Layout: React.FC = () => {
	const { theme, isSidebarOpen, isMobile } = useContext(UIContext);
	return (
		<div
			className={` w-full min-h-screen flex ${theme === "dark" ? "bg-blue-700" : "bg-white-700"}`}
		>
			<div
				className={` w-screen lg:w-[150px] sm:w-[70px]  h-screen fixed sm:relative bg-[#00000080]`}
				style={{ zIndex: 40, display: isMobile ? (isSidebarOpen ? "block" : "none") : "block" }}
			>
				<div className="h-screen fixed top-0 left-0  w-[150px] lg:w-[150px] sm:w-[70px]">
					<div
						className={`w-full h-screen ${
							theme === "dark"
								? "bg-blue-800 border-r border-blue-600"
								: "bg-white-100 border-r border-gray-800"
						}`}
					>
						<Sidebar />
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-1 h-full">
				<div
					className={`w-full sticky top-0 z-50 h-[60px] ${
						theme === "dark"
							? "bg-blue-800 border-b border-blue-600"
							: "bg-white-100 border-b border-gray-800"
					}`}
				>
					<Navbar />
				</div>
				<div className="grow w-full h-fit">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
