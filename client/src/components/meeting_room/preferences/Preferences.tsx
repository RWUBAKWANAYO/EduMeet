import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import {
	CameraOffIcon,
	CameraOnIcon,
	ChatBubbleIcon,
	MicIcon,
	MicOffIcon,
	RecordScreenIcon,
	ShareScreenIcon,
} from "../../../assets/icons";
import { CommonButton } from "../../shared/buttons";
import { MeetingRoomContext } from "../../../hooks/context/meetings/MeetingRoomContext";
import { ThemeButton } from "../../shared/buttons/ThemeButton";
import { IScreenRecorder } from "../../../hooks/context/types";

export const Preferences: React.FC<IScreenRecorder> = ({
	startTime,
	startRecording,
	stopRecording,
}) => {
	const { theme, isDesktop } = useContext(UIContext);
	const { leaveRoomHandler, shareScreenHandler, toggleTrack, streamTrack } =
		useContext(MeetingRoomContext);

	return (
		<div
			className={`w-full px-5 flex items-center relative h-[70px] mt-auto border-t ${
				theme === "dark" ? "bg-blue-800 border-transparent-400" : "bg-white-100 border-gray-800"
			}`}
		>
			<div className="absolute left-6">
				<ThemeButton />
			</div>
			<div className="w-full  flex justify-center space-x-4">
				{streamTrack.audio && (
					<CommonButton
						type="button"
						children={MicIcon}
						hasUniqueColor={` text-white-100 `}
						extraClass={` w-10 h-10 text-xs rounded-full border-none bg-blue-100`}
						onClickHandler={() => toggleTrack("audio")}
					/>
				)}
				{!streamTrack.audio && (
					<CommonButton
						type="button"
						children={MicOffIcon}
						hasUniqueColor={` text-white-100 `}
						extraClass={` w-10 h-10 text-xs rounded-full border-none bg-red-500`}
						onClickHandler={() => toggleTrack("audio")}
					/>
				)}
				{streamTrack.video && (
					<CommonButton
						type="button"
						children={CameraOnIcon}
						hasUniqueColor={` text-white-100 `}
						extraClass={` w-10 h-10 text-xs rounded-full border-none bg-blue-100`}
						onClickHandler={() => toggleTrack("video")}
					/>
				)}

				{!streamTrack.video && (
					<CommonButton
						type="button"
						children={CameraOffIcon}
						hasUniqueColor={` text-white-100 `}
						extraClass={` w-10 h-10 text-xs rounded-full border-none bg-red-500`}
						onClickHandler={() => toggleTrack("video")}
					/>
				)}
				{isDesktop && (
					<CommonButton
						type="button"
						children={ShareScreenIcon}
						hasUniqueColor={` text-blue-100 `}
						extraClass={` w-10 h-10 text-xs rounded-full ${
							theme === "dark" ? "bg-blue-300 border-none" : "bg-white-600 border-blue-50"
						}`}
						onClickHandler={shareScreenHandler}
					/>
				)}

				{isDesktop && !startTime && (
					<CommonButton
						type="button"
						children={RecordScreenIcon}
						hasUniqueColor={` text-blue-100 `}
						extraClass={` text-xs rounded-full border-none bg-transparent-0`}
						onClickHandler={startRecording}
					/>
				)}

				{isDesktop && startTime && (
					<CommonButton
						type="button"
						children={RecordScreenIcon}
						hasUniqueColor={` text-red-500 `}
						extraClass={` text-xs rounded-full border-none bg-transparent-0`}
						onClickHandler={stopRecording}
					/>
				)}

				<CommonButton
					type="button"
					children={ChatBubbleIcon}
					hasUniqueColor={` text-blue-100 `}
					extraClass={` w-10 h-10 text-xs rounded-full border-none ${
						theme === "dark" ? "bg-blue-300 border-none" : "bg-white-600 border-blue-50"
					}`}
				/>
			</div>
			<div className=" flex items-center pr-6 absolute top-0 right-0 h-full ">
				<CommonButton
					type="button"
					children={<h3>End Call</h3>}
					hasUniqueColor={` text-white-100 `}
					extraClass={` px-6 h-9 text-xs rounded-full border-none bg-red-500`}
					onClickHandler={leaveRoomHandler}
				/>
			</div>
		</div>
	);
};
