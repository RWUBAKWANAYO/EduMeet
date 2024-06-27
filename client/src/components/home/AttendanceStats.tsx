import React, { useContext } from "react";
import { AbsentUserIcon, AttendedUserIcon } from "../../assets/icons";
import { UIContext } from "../../hooks/context/UIContext";

export const AttendanceStats: React.FC = () => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={`px-4 pt-4 pb-8 w-full  rounded-lg space-y-4 border ${
        theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
      }`}
    >
      <h3
        className={`text-xs font-medium ${
          theme === "dark" ? "text-transparent-300" : "text-black-400"
        }`}
      >
        Attendance Summary
      </h3>

      <div className="w-full  flex items-center space-x-6 ">
        <div className={`${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
          {AttendedUserIcon("size-6")}
        </div>
        <div className="flex-1 space-y-2">
          <h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
            Meetings Attended
          </h3>
          <div
            className={`w-full h-1 rounded-full ${
              theme === "dark" ? "bg-transparent-100" : "bg-gray-800"
            }`}
          >
            <div className="h-full w-1/2 bg-orange-400 rounded-full"></div>
          </div>
        </div>
        <h3
          className={`text-sm font-semibold ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          75%
        </h3>
      </div>
      <div className="w-full  flex items-center space-x-6 ">
        <div className={`${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
          {AbsentUserIcon("size-6")}
        </div>
        <div className="flex-1 space-y-2">
          <h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
            Meetings Missed
          </h3>
          <div
            className={`w-full h-1 rounded-full ${
              theme === "dark" ? "bg-transparent-100" : "bg-gray-800"
            }`}
          >
            <div className="h-full w-1/2 bg-purple-500 rounded-full" />
          </div>
        </div>
        <h3
          className={`text-sm font-semibold ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          75%
        </h3>
      </div>
    </div>
  );
};
