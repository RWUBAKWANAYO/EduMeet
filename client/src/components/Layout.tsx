import React, { useContext } from "react";
import { Navbar } from "./shared/Navbar";
import { Sidebar } from "./shared/Sidebar";
import { Outlet } from "react-router-dom";
import { UIContext } from "../hooks/context/UIContext";
import { Modal } from "./shared/modal/Modal";

export const Layout: React.FC = () => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={`w-full min-h-screen flex ${theme === "dark" ? "bg-blue-700" : "bg-white-700"}`}
    >
      <div className={`w-fit h-screen relative `}>
        <div className="w-[60px] lg:w-[150px] h-screen relative " />
        <div
          className={`fixed top-0 left-0 w-[60px] lg:w-[150px] h-screen ${
            theme === "dark"
              ? "bg-blue-800 border-r border-blue-600"
              : "bg-white-100 border-r border-gray-800"
          }`}
        >
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col grow h-full">
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
      <Modal />
    </div>
  );
};
