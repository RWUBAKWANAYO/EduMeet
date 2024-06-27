import React, { useContext } from "react";
import { textSlice } from "../../utils";
import { UIContext } from "../../hooks/context/UIContext";
import { users } from "../../mock_data/users";
import { ChevronRightIcon } from "../../assets/icons";

export const Participants: React.FC = () => {
  const { theme } = useContext(UIContext);
  return (
    <div className={`w-full space-y-2 pr-4 overflow-auto h-full `}>
      {[...users, ...users].map((user, index) => (
        <div
          key={user._id}
          className={`flex w-full items-center justify-between space-x-2 px-4 py-2 rounded-lg border ${
            theme === "dark"
              ? `border-transparent-90 ${index === 5 ? "bg-blue-300" : "bg-blue-800"}`
              : `bg-white-100 border-gray-800 ${index === 5 ? "bg-white-600" : "bg-white-100"}`
          } `}
        >
          <div className={`flex-1 flex space-x-2 items-center`}>
            <img src={user.photo} alt="avatar" className="w-8 h-8 rounded-full " />
            <div className="flex-1 space-y-0.5">
              <div className="w-full">
                <h4 className={`text-sm ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
                  {textSlice(user.full_name, 15)}
                </h4>
                <p
                  className={`text-xs font-light ${
                    theme === "dark" ? "text-transparent-300" : "text-black-400"
                  }`}
                >
                  {textSlice("rwubakwanayoolivier@gmail.com", 15)}
                </p>
              </div>
            </div>
          </div>
          <button className={`${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
            {ChevronRightIcon}
          </button>
        </div>
      ))}
    </div>
  );
};
