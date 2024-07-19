import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { IStatsCountResponse } from "./types";
import { MessageDisplay } from "../shared/MessageDisplay";
import { AttendanceCard } from "../shared/cards";
import { calculatePercentage, errorFormat } from "../../utils";

interface IActivitiesCountProps {
	statsLoading: boolean;
	statsData?: IStatsCountResponse;
	statsError: Error | null;
}
export const AttendanceStats: React.FC<IActivitiesCountProps> = ({
	statsLoading,
	statsData = {},
	statsError,
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`px-4 py-4 w-full  rounded-lg space-y-4 border ${
				theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
			}`}
		>
			<h3
				className={`text-xs font-medium ${
					theme === "dark" ? "text-transparent-300" : "text-black-400"
				}`}
			>
				Attendance Summary
			</h3>
			{statsLoading ? (
				<MessageDisplay height="h-28" />
			) : statsError ? (
				<MessageDisplay height="h-28" message={errorFormat(statsError)} />
			) : (
				statsData?.data && (
					<div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-3">
						<AttendanceCard
							bgColor="bg-orange-400"
							title="Meetings Attended"
							count={statsData.data.attended}
							percentage={calculatePercentage(
								statsData.data.attended + statsData.data.missed,
								statsData.data.attended
							)}
						/>
						<AttendanceCard
							bgColor="bg-purple-500"
							title="Meetings Missed"
							count={statsData.data.missed}
							percentage={calculatePercentage(
								statsData.data.attended + statsData.data.missed,
								statsData.data.missed
							)}
						/>
					</div>
				)
			)}
		</div>
	);
};
