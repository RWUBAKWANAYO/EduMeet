import { useContext, useState } from "react";
import { UserContext } from "../../../hooks/context/UserContext";
import { MeetingRoomContext } from "../../../hooks/context/meetings/MeetingRoomContext";
import { IPeer } from "../../../hooks/context/types";
import { IUser } from "../../../types/users.interface";

export const useMeetingChats = (participantsSizeHandler: () => void) => {
  const { user } = useContext(UserContext);
  const { peers } = useContext(MeetingRoomContext);
  const [expanded, setExpanded] = useState<boolean>(true);

  const peersList = ((): IPeer[] => {
    const userId = user?._id || "";
    const { [userId]: _, ...rest } = peers;
    return Object.values(rest);
  })();

  const expandHandler = () => {
    setExpanded(!expanded);
    participantsSizeHandler();
  };

  const getChatMember = (members: IUser[]) => {
    return members.filter((member: IUser) => member._id !== user?._id)[0];
  };

  return {
    expanded,
    expandHandler,
    peersList,
    getChatMember,
  };
};
