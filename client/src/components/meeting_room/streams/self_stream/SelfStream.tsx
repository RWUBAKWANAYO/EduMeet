import React, { useContext } from "react";
import { CommonButton } from "../../../shared/buttons";
import { ExpandScreenIcon, RecordIcon, SoundWaveIcon } from "../../../../assets/icons";
import { UIContext } from "../../../../hooks/context/UIContext";
import { VideoPlayer } from "../video_player/VideoPlayer";
import { useSelfStream } from "./useSelfStream";
import { IUser } from "../../../../types/users.interface";
import { IScreenRecorder } from "../../../../hooks/context/types";

export const SelfStream: React.FC<IScreenRecorder> = ({ startTime, elapsedTime }) => {
	const { theme, isDesktop } = useContext(UIContext);
	const { renderPeer, streamTrack, user } = useSelfStream();

	return (
		<div
			className={`border w-full h-3/4 grow rounded-lg overflow-hidden relative ${
				theme === "dark" ? "bg-blue-800 border-transparent-400" : "bg-white-100 border-gray-800"
			}`}
		>
			<VideoPlayer
				stream={renderPeer().stream}
				streamTrack={streamTrack}
				user={user as IUser}
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
					streamTrack.audio ? "justify-between" : "justify-end"
				}`}
			>
				<CommonButton
					type="button"
					children={ExpandScreenIcon}
					hasUniqueColor={` text-white-100 `}
					extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
				/>
				{streamTrack.audio && (
					<CommonButton
						type="button"
						children={SoundWaveIcon}
						hasUniqueColor={` text-white-100 `}
						extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
					/>
				)}
			</div>
		</div>
	);
};
