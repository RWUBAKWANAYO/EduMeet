import { useContext } from "react";
import { ActivityCard } from "../shared/cards/ActivityCard";
import { UIContext } from "../../hooks/context/UIContext";
import { IFilterStatsResponse, IStat } from "./types";
import { joinTimeHandler } from "../../utils";

interface IParticipantsProps {
	selectedStat: IStat;
}

export const ActivitiesCount: React.FC<IParticipantsProps> = ({ selectedStat }) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={` w-full rounded-lg p-4 border ${
				theme === "dark" ? " bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
			}`}
		>
			{" "}
			<h3
				className={`mb-4 text-xs font-medium   ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				Activitites stats
			</h3>
			<div className="w-full grid grid-cols-3  gap-2">
				<ActivityCard
					title="User Joined meeting"
					count={
						selectedStat?.attendances && selectedStat.attendances.length > 0
							? joinTimeHandler(
									selectedStat.attendances[0]?.start_time || "",
									selectedStat?.meeting?.start_time || ""
							  )
							: "N/A"
					}
				/>
				<ActivityCard
					title="User Left meeting"
					count={
						selectedStat?.attendances && selectedStat.attendances.length > 0
							? joinTimeHandler(
									selectedStat.attendances[selectedStat.attendances.length - 1]?.end_time || "",
									selectedStat?.meeting?.end_time || ""
							  )
							: "N/A"
					}
				/>
				<ActivityCard title="User Left meeting" count={"5 min early"} />
				<ActivityCard title="User Mute audio" count={"5 times"} />
				<ActivityCard title="Average audio mute time" count={"10%"} />
				<ActivityCard title="User Mute video" count={"8 times"} />
				<ActivityCard title="Average video mute time" count={"26%"} />
				<ActivityCard title="Message sent in meeting" count={6} />
			</div>
		</div>
	);
};
