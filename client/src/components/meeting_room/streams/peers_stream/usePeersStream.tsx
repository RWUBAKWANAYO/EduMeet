import { useContext, useCallback } from "react";
import { MeetingRoomContext } from "../../../../hooks/context/meetings/MeetingRoomContext";
import { UserContext } from "../../../../hooks/context/UserContext";

export const usePeersStream = () => {
  const { user } = useContext(UserContext);
  const { peers, screenSharingId, stream, streamTrack } = useContext(MeetingRoomContext);

  const renderPeersVidoes = useCallback(() => {
    const userId = user?._id || "";
    if (screenSharingId) {
      const newPeers = { ...peers, [userId]: { stream, user, streamTrack } };
      const { [screenSharingId]: sharing, ...observer } = newPeers;
      return Object.values(observer);
    } else {
      const { [userId]: sharing, ...observer } = peers;
      return Object.values(observer);
    }
  }, [peers, screenSharingId, stream, streamTrack, user])();

  return {
    renderPeersVidoes,
  };
};
