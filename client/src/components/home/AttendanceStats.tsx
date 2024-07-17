import React, { useContext } from "react";
import { AbsentUserIcon, AttendedUserIcon } from "../../assets/icons";
import { UIContext } from "../../hooks/context/UIContext";
import { IStatsCountResponse } from "./types";
import { MessageDisplay } from "../shared/MessageDisplay";
import { AttendanceCard } from "../shared/cards";
import { calculatePercentage } from "../../utils";

interface IActivitiesCountProps {
	statsLoading: boolean;
	statsData?: IStatsCountResponse;
}
export const AttendanceStats: React.FC<IActivitiesCountProps> = ({
	statsLoading,
	statsData = {},
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
				<MessageDisplay message="Loading...." />
			) : (
				statsData?.data && (
					<div className="w-full grid grid-cols-2 gap-3">
						<AttendanceCard
							bgColor="bg-orange-400"
							title="Meetings Attended"
							count={statsData.data.attended}
							percentage={calculatePercentage(
								statsData.data.attended + statsData.data.missed,
								statsData.data.missed
							)}
						/>
						<AttendanceCard
							bgColor="bg-purple-500"
							title="Meetings Missed"
							count={statsData.data.missed}
							percentage={calculatePercentage(
								statsData.data.attended + statsData.data.missed,
								statsData.data.attended
							)}
						/>
					</div>
				)
			)}
		</div>
	);
};
