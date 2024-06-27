import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { UsersIcon } from "../../assets/icons";
import { meetings } from "../../mock_data/meetings";
import { IMeetingData } from "../../types/meetings.interface";
import { meetingDisplayTime } from "../../utils";
import { CommonClipboard } from "../shared/buttons";

export const MeetingsList: React.FC = () => {
  const { theme } = useContext(UIContext);
  const meetingData = meetings.slice(0, 5);

  return (
    <div className="w-full h-fit space-y-2">
      <h3
        className={`text-xs mb-4 font-medium ${
          theme === "dark" ? "text-transparent-300" : "text-black-400"
        }`}
      >
        Meetings
      </h3>
      {meetingData.map((meeting: IMeetingData) => (
        <div
          key={meeting?._id}
          className={`flex justify-between items-center p-4 w-full h-fit rounded-md border
    ${
      theme === "dark"
        ? ` bg-transparent-400 border-transparent-100`
        : `border-gray-800 bg-white-100`
    }`}
        >
          <div className="h-fit ">
            <h3
              className={`text-sm font-semi-bold ${
                theme === "dark" ? "text-white-800" : "text-black-600"
              }`}
            >
              {meeting.title}
            </h3>
            <p
              className={`text-xs mt-2 font-light ${
                theme === "dark" ? "text-transparent-300" : "text-white-500"
              }`}
            >
              ⏰ {meetingDisplayTime(meeting.start_time, meeting.end_time, meeting.status)}
            </p>
          </div>
          <div
            className={`flex items-center space-x-2 text-sm ${
              theme === "dark" ? "text-white-800" : "text-black-600"
            }`}
          >
            {UsersIcon} &nbsp;
            {meeting.participants.length + 1}
          </div>
          <div className=" h-fit flex space-x-2">
            <CommonClipboard inputData={meeting.session_id} displayData="id" tostData="ID" />

            <CommonButton
              hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
              children="Join"
              type="button"
              extraClass="h-8 px-4 text-xs font-semi-bold"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
