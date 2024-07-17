import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

export const ActivityCard = ({ title, count }: { title: string; count: number | string }) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={` flex items-end space-x-3 p-3 border rounded-md ${
				theme === "dark"
					? "bg-transparent-400 border-transparent-90"
					: "bg-white-100 border-gray-800"
			}`}
		>
			<h4
				className={`text-lg font-semibold ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				{count}
			</h4>
			<h3
				className={`text-xs pb-1 ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}
			>
				{title}
			</h3>
		</div>
	);
};
