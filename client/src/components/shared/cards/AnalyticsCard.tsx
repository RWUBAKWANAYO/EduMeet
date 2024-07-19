import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

export const AnalyticsCard = ({ title, count }: { title: string; count: number | string }) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={` flex flex-col items-center border rounded-md  p-3 space-y-2  ${
				theme === "dark"
					? "bg-transparent-400 border-transparent-90"
					: "bg-black-200 border-gray-800"
			}`}
		>
			{" "}
			<h3 className={`text-xs  ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
				{title}
			</h3>
			<h4
				className={`text-base font-semibold   ${
					theme === "dark" ? " text-white-800" : " text-black-600"
				}`}
			>
				{count}
			</h4>
		</div>
	);
};
