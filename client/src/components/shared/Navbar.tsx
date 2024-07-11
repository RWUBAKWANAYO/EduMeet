import React, { ReactNode, useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { textSlice } from "../../utils";
import { CommonButton } from "./buttons";
import { UserContext } from "../../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import { RenderAvatar } from "../../utils/RenderAvatar";

export const Navbar: React.FC<{ meetingHeadLine?: ReactNode }> = ({ meetingHeadLine }) => {
  const { removeUser, user } = useContext(UserContext);
  const { activePage, theme } = useContext(UIContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeUser();
    navigate("/auth");
  };
  return (
    <div
      className={`w-full h-full flex justify-between items-center ${
        meetingHeadLine ? "px-6" : "px-8"
      }`}
    >
      {meetingHeadLine ? (
        meetingHeadLine
      ) : (
        <h1
          className={`text-base font-bold ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          {activePage}
        </h1>
      )}
      <div className=" grow flex h-full justify-end items-center">
        <div
          className={` py-1 px-1.5 rounded-full flex items-center space-x-6 ${
            theme === "dark"
              ? "bg-blue-700 border border-transparent-400"
              : "bg-white-700 border border-gray-800 text-black-600"
          }`}
        >
          <div className="flex items-center space-x-2 ">
            <RenderAvatar
              photo={user?.photo}
              fullName={user!.full_name}
              hasExtraClass="h-6 w-6 rounded-full"
            />
            <h3
              className={`hidden lg:flex text-xs ${
                theme === "dark" ? "text-white-800" : "text-black-600"
              }`}
            >
              {textSlice(user!.full_name, 15)}
            </h3>
          </div>

          <CommonButton
            type="button"
            children={<h3>Logout</h3>}
            hasUniqueColor={` ${theme === "dark" ? "text-white-800" : "text-black-600"} `}
            extraClass={` px-4 h-7 text-xs rounded-full border ${
              theme === "dark"
                ? "bg-blue-600 border-transparent-100"
                : "bg-white-100 border-gray-800"
            }`}
            onClickHandler={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};
