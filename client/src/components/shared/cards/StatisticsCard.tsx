import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

interface IStatisticsCard {
	icon: React.ReactNode;
	title: string;
	count: number;
	percentage: number;
	color: string;
}
export const StatisticsCard: React.FC<IStatisticsCard> = ({
	icon,
	title,
	count,
	percentage,
	color,
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`w-full px-4 py-2 rounded-lg space-y-4 border ${
				theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
			}`}
		>
			<div
				className={`w-full flex space-x-2  ${
					theme === "dark" ? "text-transparent-300" : "text-black-400"
				}`}
			>
				<div>{icon}</div>
				<h3 className={`text-xs `}>{title}</h3>
			</div>
			<div className={`w-full flex justify-between items-center`}>
				<h1
					className={`text-md font-semibold ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					{count}
				</h1>
				<div
					className={`relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden ${
						theme === "dark" ? "bg-transparent-100" : "bg-gray-800"
					}`}
				>
					<div
						className={`w-full absolute z-10 top-0 left-0 `}
						style={{ height: `${percentage}%`, backgroundColor: `${color}` }}
					/>
					<div
						className={`w-5/6 h-5/6 relative z-20 rounded-full text-[10px] font-bold flex justify-center items-center ${
							theme === "dark" ? "bg-blue-800 text-white-800" : "bg-white-100 black-600"
						}`}
					>
						{percentage}%
					</div>
				</div>
			</div>
		</div>
	);
};
