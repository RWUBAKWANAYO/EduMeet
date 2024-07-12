import { useCallback, useContext, useMemo } from "react";
import { UserContext } from "../../../../hooks/context/UserContext";
import { MeetingRoomContext } from "../../../../hooks/context/meetings/MeetingRoomContext";
export const useSelfStream = () => {
  const { user } = useContext(UserContext);
  const { peers, screenSharingId, screenStream, stream, streamTrack } =
    useContext(MeetingRoomContext);

  const renderPeer = useCallback(() => {
    if (!screenSharingId) return { user, stream };
    if (screenSharingId === user?._id) {
      return { user, stream: screenStream };
    } else {
      return { ...peers[screenSharingId] };
    }
  }, [peers, screenSharingId, screenStream, stream, user]);

  return useMemo(
    () => ({
      renderPeer,
      streamTrack,
      user,
    }),
    [renderPeer, streamTrack]
  );
};
