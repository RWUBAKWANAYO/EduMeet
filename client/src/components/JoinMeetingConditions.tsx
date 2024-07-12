import React, { useContext, useEffect } from "react";
import { UIContext } from "../hooks/context/UIContext";
import { WaitingSpinner } from "./shared/spinners/Spinners";
import { MessageCard } from "./shared/cards/MessageCard";
import { meetingDurationUntilStart } from "../utils";
import { useNavigate } from "react-router-dom";
import { FaceFrownIcon } from "../assets/icons";
import { MeetingsContext } from "../hooks/context/meetings/MeetingsContext";

export const withJoinMeetingConditions = (Component: React.FC) => {
  return () => {
    const { theme } = useContext(UIContext);
    const { accessRoom, setAccessRoom } = useContext(MeetingsContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (accessRoom && accessRoom.status === "success" && accessRoom.data?._id) {
        navigate(`/rooms/${accessRoom.data._id}`);
      }
    }, [accessRoom, navigate, setAccessRoom]);

    if (accessRoom && accessRoom.require_confirm) {
      return (
        <div
          className={`w-full min-h-screen flex flex-col justify-center items-center relative ${
            theme === "dark" ? "text-white-300 bg-blue-800" : "bg-white-700 text-black-600"
          }`}
        >
          <WaitingSpinner />
          <h1
            className={`text-xl md:text-2xl mt-8 text-center font-medium md:font-semibold ${
              theme === "dark" ? "text-white-300" : "text-black-600"
            }`}
          >
            Waiting for Host Approval
          </h1>
        </div>
      );
    }

    if (accessRoom && accessRoom.waiting_room === false) {
      return (
        <div
          className={`w-full min-h-screen flex flex-col justify-center items-center relative ${
            theme === "dark" ? "text-white-300 bg-blue-800" : "bg-white-700 text-black-600"
          }`}
        >
          <MessageCard
            title={`${meetingDurationUntilStart(accessRoom.start_time)} until the meeting starts`}
            message="This meeting has no waiting room. Please wait for the scheduled start time."
            iconColor="text-indigo-700"
            iconBg="bg-indigo-200"
            actionButtonName="Back"
            actionButtonHandler={() => setAccessRoom(null)}
            cancelButtonStyle="hidden"
            actionButtonStyle="bg-indigo-600 text-white-100"
          />
        </div>
      );
    }
    if (accessRoom && accessRoom.join_request_rejected === true) {
      return (
        <div
          className={`w-full min-h-screen flex flex-col justify-center items-center relative ${
            theme === "dark" ? "text-white-300 bg-blue-800" : "bg-white-700 text-black-600"
          }`}
        >
          <MessageCard
            title={`Request to Join Rejected`}
            message="Unfortunately, your request to join the meeting has been rejected by the host. Please try again later."
            icon={FaceFrownIcon()}
            iconColor="text-indigo-700"
            iconBg="bg-indigo-200"
            actionButtonName="Back"
            actionButtonHandler={() => setAccessRoom(null)}
            cancelButtonStyle="hidden"
            actionButtonStyle="bg-indigo-600 text-white-100"
          />
        </div>
      );
    }

    return <Component />;
  };
};
