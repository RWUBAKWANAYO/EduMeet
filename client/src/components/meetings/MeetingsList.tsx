import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton, CommonClipboard } from "../shared/buttons";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { IMeetingData } from "../../types/meetings.interface";
import { errorFormat, meetingDisplayTime } from "../../utils";
import { RenderAvatar } from "../../utils/RenderAvatar";
import { useMeetings } from "./useMeetings";
import { MessageDisplay } from "../shared/MessageDisplay";
import { v4 as uuidv4 } from "uuid";

export const MeetingsList: React.FC<{ toggleMeetingDetails: () => void }> = ({
	toggleMeetingDetails,
}) => {
	const { theme, activePage } = useContext(UIContext);
	const { meetings, selectedMeeting, selectMeetingHandler } = useContext(MeetingsContext);
	const meetingData = meetings.data;
	const { allParticipants } = useMeetings();

	const toggleMeetingClick = (meeting: IMeetingData) => {
		toggleMeetingDetails();
		selectMeetingHandler(meeting);
	};

	return (
		<div className="w-full h-fit space-y-2">
			{meetings.isLoading ? (
				Array.from({ length: 3 }).map(() => (
					<MessageDisplay hasBackground={true} height="h-[21vh]" key={uuidv4()} />
				))
			) : meetings.error ? (
				<MessageDisplay
					hasBackground={true}
					height="h-[65vh]"
					message={errorFormat(meetings.error)}
				/>
			) : (
				meetingData.map((meeting: IMeetingData) => (
					<div
						key={meeting._id}
						onClick={() => toggleMeetingClick(meeting)}
						className={`cursor-pointer p-4 border w-full h-fit rounded-lg space-y-6
    ${
			theme === "dark"
				? ` border-transparent-90  ${
						selectedMeeting._id === meeting._id ? "bg-blue-100" : "bg-blue-800"
				  }`
				: `border-gray-800 ${selectedMeeting._id === meeting._id ? "bg-blue-100" : "bg-white-100"}`
		}`}
					>
						<div className="flex justify-between">
							<div>
								<h3
									className={`text-sm font-semi-bold ${
										selectedMeeting._id === meeting._id
											? "text-white-600"
											: theme === "dark"
											? "text-white-800"
											: "text-black-600"
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
						</div>
						<div className=" h-fit flex justify-between">
							<div className="h-10 flex space-x-2">
								{meeting.participants &&
									allParticipants(meeting)
										.slice(0, 3)
										.map((user) => (
											<RenderAvatar
												key={user._id}
												photo={user.photo}
												fullName={user?.full_name || ""}
												hasExtraClass="h-8 w-8 rounded-lg"
											/>
										))}
								{meeting.participants && allParticipants(meeting).length > 3 && (
									<CommonButton
										hasUniqueColor={`
                bg-blue-100  text-white-100 border-transparent-0
                ${selectedMeeting._id === meeting._id ? "shadow " : " shadow-none"} `}
										children={`+${allParticipants(meeting).length - 3}`}
										type="button"
										extraClass="w-8 h-8 text-xs font-semi-bold "
									/>
								)}
							</div>
							<div className=" flex space-x-2">
								<CommonClipboard
									inputData={meeting.session_id as number}
									displayData="id"
									tostData="ID"
									hasUniqueColor={`${
										selectedMeeting._id === meeting._id
											? "bg-white-100 text-black-600 border-none"
											: ""
									}`}
								/>
								{activePage === "Home" && (
									<CommonButton
										hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
										children="Start"
										type="button"
										extraClass="h-8 px-4 text-xs font-semi-bold"
									/>
								)}
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
};
