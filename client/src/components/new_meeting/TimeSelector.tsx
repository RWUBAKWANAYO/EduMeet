import React, { useContext } from "react";
import { NayoTimePicker } from "../shared/NayoTimePicker";
import { UIContext } from "../../hooks/context/UIContext";

interface ITimeSelector {
	selectTimeToHandler: (date: Date) => void;
	selectTimeFromHandler: (date: Date) => void;
}

export const TimeSelector: React.FC<ITimeSelector> = ({
	selectTimeToHandler,
	selectTimeFromHandler,
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div
			className={`w-full pb-4 flex flex-col border-b ${
				theme === "dark" ? " border-transparent-400" : "border-gray-800 "
			}`}
		>
			<label
				className={`text-xs font-light my-4 ${
					theme === "dark" ? "text-transparent-300" : "text-black-400"
				}`}
			>
				Select Meeting time (from - up to)
			</label>
			<div className=" w-fit flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 lg:gap-x-4 ">
				<div className="w-fit relative z-10">
					<NayoTimePicker selectTimeHandler={selectTimeFromHandler} />
				</div>

				<h3
					className={`leading-3 text-lg text-center lg:text-start ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					to
				</h3>

				<div className="w-fit relative z-0">
					<NayoTimePicker selectTimeHandler={selectTimeToHandler} />
				</div>
			</div>
		</div>
	);
};
