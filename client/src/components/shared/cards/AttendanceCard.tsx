import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

interface IAttendanceCardProps {
	count: number;
	percentage: number;
	title: string;
	bgColor: string;
}
export const AttendanceCard: React.FC<IAttendanceCardProps> = ({
	count,
	title,
	percentage,
	bgColor,
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`w-full  space-y-3 py-2 px-3 rounded border ${
				theme === "dark"
					? "bg-transparent-5400 border-transparent-90"
					: "bg-white-100 border-gray-800"
			}`}
		>
			<div className={`w-full flex justify-between`}>
				<div>
					<h3
						className={`text-sm font-semibold ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						{count}
					</h3>
					<h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
						{title}
					</h3>
				</div>
				<h3
					className={`text-sm font-semibold ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					{`${percentage}%`}
				</h3>
			</div>
			<div className={`w-full flex items-center space-x-4`}>
				<div className={`w-full h-2  ${theme === "dark" ? "bg-transparent-100" : "bg-gray-800"}`}>
					<div className={`h-full  ${bgColor}`} style={{ width: `${percentage}%` }}></div>
				</div>
			</div>
		</div>
	);
};
