import React, { useContext } from "react";
import { CommonButton } from "../../shared/buttons";
import {
	CameraOffIcon,
	CameraOnIcon,
	ChevronRightIcon,
	MicOffIcon,
	MicOnIcon,
	UserPlusIcon,
} from "../../../assets/icons";
import { UIContext } from "../../../hooks/context/UIContext";
import { textSlice } from "../../../utils";
import { useParticipants } from "./useParticipants";
import { RenderAvatar } from "../../../utils/RenderAvatar";
import AddParticipants from "../../meetings/add_participants/AddParticipants";
import { IPeer } from "../../../hooks/context/types";

interface ParticipantsPropsI {
	chatSizeHandler: () => void;
	enlargeParticipantsSize: boolean;
}
export const Participants: React.FC<ParticipantsPropsI> = ({
	chatSizeHandler,
	enlargeParticipantsSize,
}) => {
	const { theme, openModal } = useContext(UIContext);
	const { expanded, expandHandler, attendees, data, error, isLoading, inviteToMeetingHandler } =
		useParticipants(chatSizeHandler);
	return (
		<div className="w-full flex flex-col">
			<div
				className={`w-full  flex items-center justify-between items-center px-4  h-[60px] border-b ${
					theme === "dark" ? "border-transparent-400" : "border-gray-800"
				}`}
			>
				<h3
					className={`text-sm font-semi-bold  ${theme === "dark" ? "text-white-800" : "black-600"}`}
				>
					Participants
				</h3>
				<div className="flex">
					<CommonButton
						type="button"
						children={
							<div className={`flex items-center space-x-2`}>
								<h4 className="text-xs">Add new</h4>
								{UserPlusIcon}
							</div>
						}
						hasUniqueColor={`font-semi-bold text-blue-100 ${
							theme === "dark"
								? " bg-blue-300  border-transparent-400"
								: " bg-white-600 border-blue-50"
						}`}
						extraClass=" h-8 px-4 text-xs rounded-2xl "
						onClickHandler={() =>
							openModal(
								<AddParticipants
									data={data}
									error={error}
									isLoading={isLoading}
									onSubmitHandler={inviteToMeetingHandler}
								/>
							)
						}
					/>
				</div>
				<button
					type="button"
					className={`text-blue-100`}
					style={{ transform: expanded ? "rotate(90deg)" : "" }}
					onClick={expandHandler}
				>
					{ChevronRightIcon}
				</button>
			</div>
			{expanded && (
				<div
					className={`w-full py-4 ${theme === "dark" ? "bg-blue-600 " : "bg-white-700"}`}
					style={{ height: enlargeParticipantsSize ? "calc(100vh - 250px)" : "calc(50vh - 125px)" }}
				>
					<div className={`w-full h-full px-4 space-y-2  overflow-auto  `}>
						{attendees().map((attendee: IPeer) => (
							<div
								key={attendee.user._id}
								className={` py-2 pl-2 pr-4 rounded-full flex items-center justify-between ${
									theme === "dark"
										? "bg-blue-800 text-white-800"
										: "bg-white-100  text-black-600 border border-gray-800"
								}`}
							>
								<div className="flex items-center space-x-2 ">
									<RenderAvatar photo={attendee.user.photo} fullName={attendee.user.full_name} />
									<h3
										className={` lg:flex text-xs ${
											theme === "dark" ? "text-white-800" : "text-black-600"
										}`}
									>
										{textSlice(`${attendee.user.full_name}`, 15)}
									</h3>
								</div>

								<div className="flex items-center space-x-2">
									{attendee.streamTrack.audio ? (
										<button className="text-blue-100">{MicOnIcon}</button>
									) : (
										<button className="text-red-500">{MicOffIcon}</button>
									)}
									{attendee.streamTrack.video ? (
										<button className="text-blue-100">{CameraOnIcon}</button>
									) : (
										<button className="text-red-500">{CameraOffIcon}</button>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
