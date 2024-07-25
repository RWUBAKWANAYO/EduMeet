import React, { useContext } from "react";
import { UIContext } from "../../../../hooks/context/UIContext";
import { CommonButton } from "../../../shared/buttons";
import { MicIcon, MicOffIcon } from "../../../../assets/icons";
import { VideoPlayer } from "../video_player/VideoPlayer";
import { usePeersStream } from "./usePeersStream";
import { textSlice } from "../../../../utils";
import { IPeer } from "../../../../hooks/context/types";
import { v4 as uuidv4 } from "uuid";

export const PeersStream = React.memo(() => {
	const { theme, isChatBubble, isMobile } = useContext(UIContext);
	const { renderPeersVidoes } = usePeersStream();

	return (
		<div
			className={` flex overflow-auto [&>div]:flex-shrink-0 ${
				isChatBubble ? "flex-row space-x-4" : "flex-col space-y-4"
			}`}
			style={{
				width: isChatBubble ? "calc(100vw - 320px)" : "",
				height: isChatBubble ? "" : "",
			}}
		>
			{renderPeersVidoes.map((peer) => {
				const peerState = peer as IPeer;
				return (
					<div
						key={uuidv4()}
						className={`  ${isChatBubble ? "h-full w-[250px]" : "h-[250px] w-full"}`}
						style={{
							width: isMobile ? "150px" : isChatBubble ? "150px" : "25vw",
							height: isMobile ? "100px" : isChatBubble ? "100px" : "15vw",
						}}
					>
						<div
							className={`border h-full w-full rounded-lg overflow-hidden relative ${
								theme === "dark"
									? "bg-blue-800 border-transparent-400"
									: "bg-white-100 border-gray-800"
							}`}
						>
							<VideoPlayer
								stream={peerState.stream}
								streamTrack={peerState.streamTrack}
								user={peerState.user}
								avatarSize="w-12 h-12"
							/>
							<CommonButton
								type="button"
								children={
									<h4 className="text-xs">{textSlice(peerState.user?.full_name || "", 4)}</h4>
								}
								hasUniqueColor={` text-white-100 `}
								extraClass="font-semi-bold px-4 py-1.5 text-xs rounded-3xl absolute bottom-2 left-2 z-10 border-none bg-gray-500 "
							/>

							<CommonButton
								type="button"
								children={peerState.streamTrack.audio ? MicIcon : MicOffIcon}
								hasUniqueColor={` text-white-100 `}
								extraClass={`font-semi-bold w-7 h-7 text-xs rounded-full absolute bottom-2 right-2 z-10 border-none ${
									peerState.streamTrack.audio ? "bg-blue-100" : "bg-red-500"
								}`}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
});
