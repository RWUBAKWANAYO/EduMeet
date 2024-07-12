import { useContext, useState } from "react";
import { MeetingRoomContext } from "../../../hooks/context/meetings/MeetingRoomContext";
import { UserContext } from "../../../hooks/context/UserContext";
import { useFetchUsers } from "../../../hooks/custom";
import { UIContext } from "../../../hooks/context/UIContext";
import { IPeer } from "../../../hooks/context/types";
import { IUser } from "../../../types/users.interface";

export const useParticipants = (chatSizeHandler: () => void) => {
  const { user } = useContext(UserContext);
  const { closeModal } = useContext(UIContext);
  const { peers, streamTrack, inviteUsersToMeetingRoom } = useContext(MeetingRoomContext);
  const [expanded, setExpanded] = useState<boolean>(true);

  const expandHandler = () => {
    setExpanded(!expanded);
    chatSizeHandler();
  };

  const attendees = (): IPeer[] => {
    if (user && peers[user._id]) peers[user._id].streamTrack = streamTrack;
    return Object.values(peers);
  };

  const { data, error, isLoading } = useFetchUsers();

  const existPeers = Object.keys(peers);
  const userList = data?.data?.filter((member) => !existPeers.includes(member._id)) || [];

  const inviteToMeetingHandler = (receivers: IUser[]) => {
    if (receivers.length === 0) return alert("Please select at least one user to invite");
    inviteUsersToMeetingRoom(receivers);
    closeModal();
  };

  return {
    expanded,
    expandHandler,
    attendees,
    data: userList,
    error,
    isLoading,
    inviteToMeetingHandler,
  };
};
