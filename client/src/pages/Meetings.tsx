import React, { useContext } from "react";
import { UIContext } from "../hooks/context/UIContext";
import { MeetingDetails, MeetingsFilters, MeetingsList } from "../components/meetings";
import { withJoinMeetingConditions } from "../components/JoinMeetingConditions";
import { useMeetings } from "../components/meetings/useMeetings";

const Meetings: React.FC = () => {
	const { theme, isTablet } = useContext(UIContext);
	const { isMeetingDetailsOpen, toggleMeetingDetails } = useMeetings();
	return (
		<div className="w-full h-full flex flex-col lg:flex-row relative overflow-hidden">
			<div
				className={`  w-full lg:w-1/2 xl:w-2/5  flex flex-col space-y-4 items-center p-3 sm:p-8 lg:pr-6`}
			>
				<MeetingsFilters />
				<div className="w-full h-1/3 overflow-auto pr-2" style={{ height: "calc(100vh - 205px)" }}>
					<MeetingsList toggleMeetingDetails={toggleMeetingDetails} />
				</div>
			</div>
			<div
				className={`overflow-auto  w-full lg:w-1/2 xl:w-3/5 p-8 border-none lg:border-l absolute lg:relative top-0 left-0 ${
					theme === "dark" ? "bg-blue-700 border-transparent-400" : "bg-white-100 border-gray-800"
				}`}
				style={{
					height: "calc(100vh - 60px)",
					display: isTablet ? (isMeetingDetailsOpen ? "block" : "none") : "block",
				}}
			>
				<MeetingDetails toggleMeetingDetails={toggleMeetingDetails} />
			</div>
		</div>
	);
};

export default withJoinMeetingConditions(Meetings);
