import React, { useContext } from "react";
import { UIContext } from "../hooks/context/UIContext";
import { MeetingDetails, MeetingsFilters, MeetingsList } from "../components/meetings";

const Meetings: React.FC = () => {
  const { theme } = useContext(UIContext);
  return (
    <div className="w-full h-full flex ">
      <div className={`  w-2/5 h-full  flex flex-col space-y-4 items-center p-8`}>
        <MeetingsFilters />
        <div className="w-full h-1/3 overflow-hidden ">
          <MeetingsList />
        </div>
      </div>
      <div
        className={`h-sreen  w-3/5 p-8 border-l ${
          theme === "dark" ? " border-transparent-400" : " border-gray-800"
        }`}
      >
        <MeetingDetails />
      </div>
    </div>
  );
};

export default Meetings;
