import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { ChevronRightIcon, UsersIcon } from "../../assets/icons";
import { IMeetingData } from "../../types/meetings.interface";
import { meetingDisplayTime } from "../../utils";
import { CommonClipboard } from "../shared/buttons";
import { useMeetings } from "./useHome";
import { Link } from "react-router-dom";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { MessageDisplay } from "../shared/MessageDisplay";

export const MeetingsList: React.FC = () => {
	const { theme } = useContext(UIContext);
	const { meetings } = useContext(MeetingsContext);
	const { joinMeetingHandler } = useMeetings();

	return (
		<div className="w-full h-fit min-h-56 space-y-2">
			<h3
				className={`text-xs mb-4 font-medium ${
					theme === "dark" ? "text-transparent-300" : "text-black-400"
				}`}
			>
				Meetings
			</h3>
			{meetings.data.length === 0 && (
				<MessageDisplay message="No meetings scheduled on above calendar date" height="min-h-56" />
			)}
			{meetings.data.slice(0, 5).map((meeting: IMeetingData) => (
				<div
					key={meeting?._id}
					className={`flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 w-full h-fit rounded-md border
    ${
			theme === "dark"
				? ` bg-transparent-400 border-transparent-100`
				: `border-gray-800 bg-white-100`
		}`}
				>
					<div className="h-fit">
						<h3
							className={`text-xs font-medium ${
								theme === "dark" ? "text-white-800" : "text-black-600"
							}`}
						>
							{meeting.title}
						</h3>
						<p
							className={`text-xs mt-2 font-light ${
								theme === "dark" ? "text-transparent-300" : "text-white-500"
							}`}
						>
							⏰{" "}
							{meetingDisplayTime(
								meeting.start_time as Date,
								meeting.end_time as Date,
								meeting.status!
							)}
						</p>
					</div>
					<div
						className={`flex space-x-2 text-sm ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						{UsersIcon} &nbsp;
						{meeting.participants && meeting.participants.length + 1}
					</div>
					<div className=" h-fit flex space-x-2">
						<CommonClipboard
							inputData={meeting._id as string}
							displayData="id"
							tostData="ID"
							extraClass={`w-8`}
						/>

						{meeting.status !== "ended" && (
							<CommonButton
								hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
								children="Join"
								type="button"
								extraClass=" h-8 px-4 text-xs font-semi-bold "
								onClickHandler={() => joinMeetingHandler(meeting)}
							/>
						)}
					</div>
				</div>
			))}
			{meetings.data.length > 5 && (
				<div className="w-full flex justify-center pt-4">
					<Link to="/meetings" className="text-blue-100 text-sm flex items-center">
						View more &nbsp; {ChevronRightIcon}
					</Link>
				</div>
			)}
		</div>
	);
};
