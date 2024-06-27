import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton, CommonClipboard } from "../shared/buttons";
import { MeetingsContext } from "../../hooks/context/MeetingsContext";
import { IMeetingData } from "../../types/meetings.interface";
import { meetingDisplayTime } from "../../utils";
import { RenderAvatar } from "../../utils/RenderAvatar";
import { users } from "../../mock_data/users";

export const MeetingsList: React.FC = () => {
  const { theme, activePage } = useContext(UIContext);
  const { meetings, selectedMeeting, selectMeetingHandler } = useContext(MeetingsContext);

  return (
    <div className="w-full h-fit space-y-2">
      {meetings.data.map((meeting: IMeetingData) => (
        <div
          key={meeting._id}
          onClick={() => (activePage === "Home" ? null : selectMeetingHandler(meeting))}
          className={`cursor-pointer p-4 border w-full h-fit rounded-lg space-y-6
    ${
      theme === "dark"
        ? ` border-transparent-90  ${
            activePage !== "Home" && selectedMeeting._id === meeting._id
              ? "bg-blue-100"
              : "bg-blue-800"
          }`
        : `border-gray-800 ${
            activePage !== "Home" && selectedMeeting._id === meeting._id
              ? "bg-blue-100"
              : "bg-white-100"
          }`
    }`}
        >
          <div className="flex justify-between">
            <div>
              <h3
                className={`text-sm font-semi-bold ${
                  activePage !== "Home" && selectedMeeting._id === meeting._id
                    ? "text-white-600"
                    : theme === "dark"
                    ? "text-white-800"
                    : "text-black-600"
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
          </div>
          <div className=" h-fit flex justify-between">
            <div className="h-10 flex space-x-2">
              {meeting.participants.slice(0, 3).map((user) => (
                <RenderAvatar
                  key={user._id}
                  photo={user.photo}
                  fullName={user?.full_name || ""}
                  hasExtraClass="h-8 w-8 rounded-lg"
                />
              ))}
              {meeting.participants.length > 3 && (
                <CommonButton
                  hasUniqueColor={`
                bg-blue-100  text-white-100
                 `}
                  children={`+${meeting.participants.length - 3}`}
                  type="button"
                  extraClass={`w-8 h-8 text-xs font-semi-bold border ${
                    selectedMeeting._id === meeting._id
                      ? " border-transparent-300"
                      : " border-transparent-0 "
                  }`}
                />
              )}
            </div>
            <div className=" flex space-x-2">
              <CommonClipboard
                inputData={meeting.session_id}
                displayData="id"
                tostData="ID"
                hasUniqueColor={`${
                  activePage !== "Home" && selectedMeeting._id === meeting._id
                    ? "bg-white-100 text-black-600 border-none"
                    : ""
                }`}
              />
              {activePage === "Home" && (
                <CommonButton
                  hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
                  children="Start"
                  type="button"
                  extraClass="h-8 px-4 text-xs font-semi-bold"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
