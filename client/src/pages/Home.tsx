import React, { useContext } from "react";
import { DateIcon } from "../assets/icons";
import {
	AttendanceStats,
	MeetingsList,
	useMeetings,
	TimeDisplay,
	Invitations,
	ActivitiesCount,
} from "../components/home";
import { UIContext } from "../hooks/context/UIContext";

import { NayoCalendar } from "../components/shared/NayoCalendar";
import { StatisticsCard } from "../components/shared/cards/StatisticsCard";
import { LinkButtons } from "../components/home/LinkButtons";
import { withJoinMeetingConditions } from "../components/JoinMeetingConditions";
import { useCountMeetings } from "../components/meetings/useMeetings";
import { MessageDisplay } from "../components/shared/MessageDisplay";
import { calculatePercentage, errorFormat } from "../utils";
import { useCountMeetingStats } from "../components/home/useHome";

const Home: React.FC = () => {
	const { theme } = useContext(UIContext);
	const { selectDateHandler } = useMeetings();
	const {
		isLoading: meetingsLoading,
		data: meetingsData,
		error: meetingsError,
	} = useCountMeetings();
	const { isLoading: statsLoading, data: statsData } = useCountMeetingStats();

	return (
		<div className="w-full h-full flex">
			<div className="w-1/2 py-8 pl-8 pr-1.5 space-y-3">
				<LinkButtons />
				<AttendanceStats statsData={statsData} statsLoading={statsLoading} />
				<ActivitiesCount
					statsData={statsData}
					statsLoading={statsLoading}
					meetingsLoading={meetingsLoading}
					meetingsData={meetingsData}
				/>
				<Invitations />
			</div>
			<div className={` w-1/2 min-h-screen  flex flex-col space-y-3 py-8 pr-8 pl-1.5 `}>
				<div className="rounded-lg overflow-hidden">
					<TimeDisplay />
				</div>
				<div className="w-full flex space-x-3">
					<div className="flex-1 grid grid-rows-3 space-y-3">
						{meetingsLoading ? (
							<MessageDisplay message="Loading...." />
						) : meetingsError ? (
							<MessageDisplay message={errorFormat(meetingsError)} />
						) : (
							<>
								<StatisticsCard
									icon={DateIcon}
									title="Upcoming Meetings"
									count={meetingsData!.data.upcoming}
									percentage={calculatePercentage(
										meetingsData!.data.total,
										meetingsData!.data.upcoming
									)}
									color="#1A71FF"
								/>
								<StatisticsCard
									icon={DateIcon}
									title="Ongoing Meetings"
									count={meetingsData!.data.ongoing}
									percentage={calculatePercentage(
										meetingsData!.data.total,
										meetingsData!.data.ongoing
									)}
									color="rgb(168 85 247)"
								/>
								<StatisticsCard
									icon={DateIcon}
									title="Ended Meetings"
									count={meetingsData!.data.ended}
									percentage={calculatePercentage(
										meetingsData!.data.total,
										meetingsData!.data.ended
									)}
									color="rgb(251 146 60)"
								/>
							</>
						)}
					</div>
					<div
						className={`bg-blue-800 p-4 rounded-lg border ${
							theme === "dark"
								? "bg-blue-800 border-transparent-90"
								: "bg-white-100 border-gray-800"
						}`}
					>
						<h3
							className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}
						>
							Select Meetings By Date
						</h3>
						<NayoCalendar selectDateHandler={selectDateHandler} />
					</div>
				</div>
				<div
					className={`w-full p-4 pb-8 rounded-lg border ${
						theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
					}`}
				>
					<MeetingsList />
				</div>
			</div>
		</div>
	);
};

export default withJoinMeetingConditions(Home);
