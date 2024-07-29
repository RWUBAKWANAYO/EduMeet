import React, { useContext } from "react";
import { CommonButton } from "../../../shared/buttons";
import { ExpandScreenIcon, RecordIcon, SoundWaveIcon } from "../../../../assets/icons";
import { UIContext } from "../../../../hooks/context/UIContext";
import { VideoPlayer } from "../video_player/VideoPlayer";
import { useSelfStream } from "./useSelfStream";
import { IScreenRecorder } from "../../../../hooks/context/types";
import { MessageDisplay } from "../../../shared/MessageDisplay";

export const SelfStream: React.FC<IScreenRecorder> = ({ startTime, elapsedTime, isLoading }) => {
	const { theme, isDesktop } = useContext(UIContext);
	const { renderPeer, isExpanded, expandHandler } = useSelfStream();

	return (
		<div
			className={`border flex-1  rounded-lg overflow-hidden ${
				theme === "dark" ? "bg-blue-800 border-transparent-400" : "bg-white-100 border-gray-800"
			}

			${isExpanded ? "fixed top-0 left-0 w-screen h-screen bg-blue-100 z-50" : "relative"}
			`}
		>
			{isLoading ? (
				<MessageDisplay />
			) : (
				<>
					<VideoPlayer
						stream={renderPeer().stream}
						streamTrack={renderPeer().streamTrack}
						user={renderPeer().user}
						avatarSize="w-20 h-20"
					/>
					<div
						className={`h-full absolute top-0 left-2 py-2 z-10 flex flex-col ${
							isDesktop && startTime ? "justify-between" : "justify-end"
						}`}
					>
						{isDesktop && startTime && (
							<CommonButton
								type="button"
								children={
									<div className={`flex items-center space-x-2`}>
										{RecordIcon}
										<h4 className="text-xs">{elapsedTime}</h4>
									</div>
								}
								hasUniqueColor={` text-white-100 `}
								extraClass="w-fit font-semi-bold px-3 py-1.5 text-xs rounded-3xl border-none bg-gray-500 "
							/>
						)}
						<CommonButton
							type="button"
							children={<h4 className="text-xs">{renderPeer().user?.full_name}</h4>}
							hasUniqueColor={` text-white-100 `}
							extraClass="w-fit font-semi-bold px-4 py-1.5 text-xs rounded-3xl border-none bg-gray-500 "
						/>
					</div>
					<div
						className={`h-full absolute top-0 right-2 py-2 z-10 flex flex-col ${
							renderPeer().streamTrack?.audio ? "justify-between" : "justify-end"
						}`}
					>
						<CommonButton
							type="button"
							children={ExpandScreenIcon}
							hasUniqueColor={` text-white-100 `}
							extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
							onClickHandler={expandHandler}
						/>
						{renderPeer().streamTrack?.audio && (
							<CommonButton
								type="button"
								children={SoundWaveIcon}
								hasUniqueColor={` text-white-100 `}
								extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
