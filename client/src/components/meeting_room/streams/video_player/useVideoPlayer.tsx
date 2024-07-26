import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../../hooks/context/UserContext";
import { IUser } from "../../../../types/users.interface";

export const useVideoPlayer = (stream?: MediaStream, peerUser?: IUser | null) => {
	const { user } = useContext(UserContext);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;
			if (peerUser && user && peerUser._id === user._id) {
				videoRef.current.muted = true;
			}
		}
	}, [stream]);

	return {
		videoRef,
	};
};
