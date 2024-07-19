import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

export const ActivityCard = ({ title, count }: { title: string; count: number | string }) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={` flex items-center  border rounded-md ${
				theme === "dark"
					? "bg-transparent-400 border-transparent-90"
					: "bg-black-200 border-gray-800"
			}`}
		>
			<h4
				className={`text-lg font-semibold h-full min-w-20 sm:min-w-14 rounded-md p-3 flex items-center justify-center border-r ${
					theme === "dark"
						? "border-transparent-90 bg-transparent-400 text-white-800"
						: "bg-black-200 border-gray-800 text-black-600"
				}`}
			>
				{count}
			</h4>
			<h3
				className={`text-xs px-3 ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}
			>
				{title}
			</h3>
		</div>
	);
};
