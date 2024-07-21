import { useCallback, useContext, useMemo, useState } from "react";
import { UserContext } from "../../../../hooks/context/UserContext";
import { MeetingRoomContext } from "../../../../hooks/context/meetings/MeetingRoomContext";
export const useSelfStream = () => {
	const { user } = useContext(UserContext);
	const { peers, screenSharingId, screenStream, stream, streamTrack } =
		useContext(MeetingRoomContext);

	const [isExpanded, setIsExpanded] = useState(false);
	const expandHandler = () => setIsExpanded(!isExpanded);

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
			isExpanded,
			expandHandler,
		}),
		[renderPeer, streamTrack, isExpanded, expandHandler]
	);
};
