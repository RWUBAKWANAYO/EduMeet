import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MeetingRoomContext } from "../../../hooks/context/meetings/MeetingRoomContext";

export const useHeadLine = () => {
  const { meetingInfo } = useContext(MeetingRoomContext);
  const location = useLocation();
  const meetingLink = `${window.location.origin}${location.pathname}`;

  const meetingData = (() => {
    if (!meetingInfo || !meetingInfo.current) return;

    const { participants = [], ...rest } = meetingInfo.current;
    return {
      ...rest,
      participants: {
        other: participants.length - 3,
        list: participants.slice(0, 3),
      },
    };
  })();

  return {
    meetingLink,
    meetingData,
  };
};
