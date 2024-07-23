/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { Navbar } from "../components/shared/Navbar";
import { UIContext } from "../hooks/context/UIContext";
import {
	MessageComposer,
	MeetingChats,
	Participants,
	SelfStream,
	Preferences,
	PeersStream,
	HeadLine,
} from "../components/meeting_room";
import { useMeetingRoom } from "../components/meeting_room/useMeetingRoom";
import { useScreenRecorder } from "../hooks/custom";
import { XMark } from "../assets/icons";
import { usePeersStream } from "../components/meeting_room/streams/peers_stream/usePeersStream";

export const MeetingRoom = () => {
	const { theme, isChatBubble, chatBubbleHandler } = useContext(UIContext);
	const { chatSizeHandler, participantsSizeHandler, enlargeChatSize, enlargeParticipantsSize } =
		useMeetingRoom();
	const { startTime, elapsedTime, startRecording, stopRecording } =
		window.innerWidth > 1024
			? useScreenRecorder()
			: { startTime: null, elapsedTime: "", startRecording: () => {}, stopRecording: () => {} };
	const { renderPeersVidoes } = usePeersStream();
	return (
		<div
			className={`relative w-full h-screen ${theme === "dark" ? "bg-blue-700" : "bg-white-700"}`}
		>
			<div
				className={`w-full sticky top-0 z-50 h-[60px] border-b ${
					theme === "dark" ? "bg-blue-800  border-blue-600" : "bg-white-100  border-gray-800"
				}`}
			>
				<Navbar meetingHeadLine={<HeadLine />} />
			</div>

			<div className={`relative flex w-full`} style={{ height: "calc(100% - 60px)" }}>
				<div className="flex flex-col flex-1 h-full">
					<div
						className={` w-full flex px-4 sm:px-8 pt-4   ${
							isChatBubble
								? "flex-col space-y-4 pb-4"
								: "flex-col space-y-4  pb-4 md:flex-row md:space-y-0 md:space-x-4"
						}`}
						style={{ height: "calc(100vh - 130px)" }}
					>
						<SelfStream startTime={startTime} elapsedTime={elapsedTime} />
						{renderPeersVidoes.length > 0 && <PeersStream />}
					</div>
					<Preferences
						startTime={startTime}
						elapsedTime={elapsedTime}
						startRecording={startRecording}
						stopRecording={stopRecording}
					/>
				</div>
				{isChatBubble && (
					<div
						className={`absolute md:relative right-0 top-0 z-30 bg-blue-100 w-full  md:w-[300px] h-full border-l flex flex-col justify-start  ${
							theme === "dark" ? "bg-blue-800 border-blue-600" : "bg-white-100 border-gray-800"
						}`}
					>
						<button
							className={`border flex md:hidden items-center justify-center absolute top-0 left-0  w-7 h-7 shadow absolute top-0 left-0 ${
								theme === "dark"
									? "bg-blue-700 border-transparent-100 text-white-600"
									: "border-gray-800 bg-white-100 text-black-400"
							}`}
							onClick={chatBubbleHandler}
						>
							{XMark("size-5")}
						</button>
						<Participants
							chatSizeHandler={chatSizeHandler}
							enlargeParticipantsSize={enlargeParticipantsSize}
						/>
						<MeetingChats
							enlargeChatSize={enlargeChatSize}
							participantsSizeHandler={participantsSizeHandler}
						/>
						<MessageComposer />
					</div>
				)}
			</div>
		</div>
	);
};
