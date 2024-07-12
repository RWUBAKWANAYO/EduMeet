import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MeetingRoomContext } from "../../../hooks/context/meetings/MeetingRoomContext";
import { IUser } from "../../../types/users.interface";

export const useHeadLine = () => {
  const { meetingInfo } = useContext(MeetingRoomContext);
  const location = useLocation();
  const meetingLink = `${window.location.origin}${location.pathname}`;

  const meetingData = (() => {
    if (!meetingInfo || !meetingInfo.current) return;

    const { participants, ...rest } = meetingInfo.current;
    const members: IUser[] = participants
      ? [rest.host as IUser, ...participants]
      : [rest.host as IUser];
    return {
      ...rest,
      participants: {
        other: members.length - 3,
        list: members.slice(0, 3),
      },
    };
  })();

  return {
    meetingLink,
    meetingData,
  };
};
