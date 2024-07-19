import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { IStat } from "./types";
import moment from "moment";

interface ICardProps {
	title: string;
	stat: IStat["audio_muted"] | IStat["video_muted"] | IStat["screen_sharing"] | IStat["recordings"];
	action: "attendance" | "audio" | "video" | "sharing" | "recording";
}
interface ISubCardProps {
	color: string;
	name: string;
	time: string;
}

const actions = {
	attendance: {
		start_time: "Joined",
		end_time: "Left",
	},
	audio: {
		start_time: "Audio On",
		end_time: "Audio Off",
	},
	video: {
		start_time: "Video On",
		end_time: "Video Off",
	},
	sharing: {
		start_time: "Start Sharing",
		end_time: "Stop Sharing",
	},
	recording: {
		start_time: "Start Recording",
		end_time: "Stop Recording",
	},
};

const MuteTimeSubCard = ({ color, name, time }: ISubCardProps) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`mx-4  flex justify-between items-center py-2 border-b ${
				theme === "dark" ? " border-transparent-90" : " border-gray-800"
			} `}
		>
			<h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
				{time}
			</h3>
			<div>
				<h4 className={`text-xs ${color}`}>{name}</h4>
			</div>
		</div>
	);
};

const MuteTimeCard = ({ title, stat, action }: ICardProps) => {
	const { theme } = useContext(UIContext);
	return (
		<div className={`py-4 w-full `}>
			<div
				className={`px-4 mb-4 flex justify-between items-end pb-4  border-b ${
					theme === "dark" ? " border-transparent-90" : " border-gray-800"
				}`}
			>
				<h3
					className={`text-xs font-medium  ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					{title}
				</h3>
				<h3
					className={`text-xs font-medium  ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Action
				</h3>
			</div>
			{stat &&
				stat.map((item) => (
					<>
						{item.start_time && (
							<MuteTimeSubCard
								time={moment(item.start_time).format("hh:mm:ss A")}
								color="text-green-500"
								name={actions[action].start_time}
							/>
						)}
						{item.end_time && (
							<MuteTimeSubCard
								time={moment(item.end_time).format("hh:mm:ss A")}
								color="text-red-500"
								name={actions[action].end_time}
							/>
						)}
					</>
				))}
		</div>
	);
};
export const MuteTime: React.FC<{ selectedStat: IStat }> = ({ selectedStat }) => {
	const { theme } = useContext(UIContext);

	return (
		<div className="w-full grid grid-cols-2 gap-4">
			<div
				className={`w-full rounded-lg overflow-auto h-[200px] border ${
					theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
				}`}
			>
				<MuteTimeCard
					title="Attendance timestamp"
					stat={selectedStat.attendances}
					action="attendance"
				/>
			</div>
			<div
				className={`w-full rounded-lg overflow-auto h-[200px] border ${
					theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
				}`}
			>
				<MuteTimeCard title="Audio timestamp" stat={selectedStat.audio_muted} action="audio" />
			</div>
			<div
				className={`w-full rounded-lg overflow-auto h-[200px] border ${
					theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
				}`}
			>
				<MuteTimeCard title="Video timestamp" stat={selectedStat.video_muted} action="video" />
			</div>
			<div
				className={`w-full rounded-lg overflow-auto h-[200px] border ${
					theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
				}`}
			>
				<MuteTimeCard
					title="Screen Sharing timestamp"
					stat={selectedStat.screen_sharing}
					action="sharing"
				/>
			</div>
			<div
				className={`w-full rounded-lg overflow-auto h-[200px] border ${
					theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
				}`}
			>
				<MuteTimeCard
					title="Recordings timestamp"
					stat={selectedStat.recordings}
					action="recording"
				/>
			</div>
		</div>
	);
};
