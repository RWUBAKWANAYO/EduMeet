import React, { useContext } from "react";
import { DateIcon } from "../assets/icons";
import { v4 as uuidv4 } from "uuid";
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
	const { isLoading: statsLoading, error: statsError, data: statsData } = useCountMeetingStats();

	return (
		<div className="w-full h-full flex flex-col xl:flex-row p-3 sm:p-8 xl:p-0 space-y-3 xl:space-y-0 ">
			<div className=" flex flex-col grow w-full xl:w-1/2 p-0 xl:py-8 xl:pl-8 xl:pr-1.5 space-y-3">
				<LinkButtons />
				<AttendanceStats
					statsData={statsData}
					statsLoading={statsLoading}
					statsError={statsError}
				/>
				<ActivitiesCount
					statsData={statsData}
					statsLoading={statsLoading}
					meetingsLoading={meetingsLoading}
					meetingsData={meetingsData}
				/>
				<Invitations />
			</div>
			<div
				className={`w-full xl:w-1/2 flex flex-col  grow min-h-screen  space-y-3 p-0 xl:py-8 xl:pr-8 xl:pl-1.5 `}
			>
				<div className="w-full rounded-lg overflow-hidden">
					<TimeDisplay />
				</div>
				<div className="w-full flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
					<div className="flex-1 grid grid-rows-3 space-y-3">
						{meetingsLoading
							? Array.from({ length: 3 }).map(() => (
									<MessageDisplay hasBackground={true} height="h-28 sm:h-auto" key={uuidv4()} />
							  ))
							: meetingsError
							? Array.from({ length: 3 }).map(() => (
									<MessageDisplay
										hasBackground={true}
										height="h-28 sm:h-auto"
										message={errorFormat(meetingsError)}
										key={uuidv4()}
									/>
							  ))
							: meetingsData &&
							  meetingsData.data && (
									<>
										<StatisticsCard
											icon={DateIcon}
											title="Upcoming Meetings"
											count={meetingsData!.data.upcoming}
											percentage={calculatePercentage(
												meetingsData!.data.total,
												meetingsData!.data.upcoming
											)}
											color="rgb(168 85 247)"
										/>
										<StatisticsCard
											icon={DateIcon}
											title="Ongoing Meetings"
											count={meetingsData.data.ongoing}
											percentage={calculatePercentage(
												meetingsData.data.total,
												meetingsData.data.ongoing
											)}
											color="#1A71FF"
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
						className={`bg-blue-800 p-4 min-h-80 min-w-[300px] border rounded-lg border ${
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
					className={`w-full grow p-4 pb-8 rounded-lg border ${
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
