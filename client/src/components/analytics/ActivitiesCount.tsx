import { useContext } from "react";
import { AnalyticsCard } from "../shared/cards";
import { UIContext } from "../../hooks/context/UIContext";
import { IStat } from "./types";
import { durationHandler, joinTimeHandler } from "../../utils";
import moment from "moment";

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
			<div className="w-full grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-2">
				<AnalyticsCard
					title="Meeting date"
					count={
						selectedStat.meeting?.start_time
							? moment(selectedStat.meeting.start_time).format("MMMM Do YYYY")
							: "N/A"
					}
				/>
				<AnalyticsCard
					title="Meeting Duration"
					count={
						selectedStat.meeting?.start_time && selectedStat.meeting?.end_time
							? durationHandler(selectedStat.meeting.start_time, selectedStat.meeting.end_time)
							: "N/A"
					}
				/>
				<AnalyticsCard
					title="User Joined meeting"
					count={
						selectedStat.attendances.length > 0
							? joinTimeHandler(
									selectedStat.attendances[0]?.start_time || "",
									selectedStat?.meeting?.start_time || ""
							  )
							: "N/A"
					}
				/>
				<AnalyticsCard
					title="User Left meeting"
					count={
						selectedStat.attendances.length > 0
							? joinTimeHandler(
									selectedStat.attendances[selectedStat.attendances.length - 1]?.end_time || "",
									selectedStat?.meeting?.end_time || ""
							  )
							: "N/A"
					}
				/>
				<AnalyticsCard
					title="User Mute audio"
					count={
						selectedStat.audio_muted.length > 0
							? `${selectedStat.audio_muted.length} times`
							: "Whole time"
					}
				/>
				<AnalyticsCard
					title="User Mute video"
					count={
						selectedStat.video_muted.length > 0
							? `${selectedStat.video_muted.length} times`
							: "Whole time"
					}
				/>
				<AnalyticsCard
					title="User shared screen"
					count={`${selectedStat.screen_sharing.length} times`}
				/>
				<AnalyticsCard
					title="User recorded meeting"
					count={`${selectedStat.recordings.length} times`}
				/>
			</div>
		</div>
	);
};
