import React, { useContext } from "react";
import { CommonButton } from "../../shared/buttons";
import { PlusCircleOutlineIcon, RefreshIcon } from "../../../assets/icons";
import { UIContext } from "../../../hooks/context/UIContext";
import { useMeetingsFilters } from "./useMeetingsFilters";
import { MeetingsContext } from "../../../hooks/context/meetings/MeetingsContext";
import { MessageDisplay } from "../../shared/MessageDisplay";

export const MeetingsFilters: React.FC = () => {
	const { theme } = useContext(UIContext);
	const { navigateHandler, refreshHandler, upcomingHandler, endedHandler, ongoingHandler, status } =
		useMeetingsFilters();
	const { meetings } = useContext(MeetingsContext);
	return (
		<div
			className={`w-full flex justify-between items-center border-b pb-6 pr-2 ${
				theme === "dark" ? " border-transparent-400" : "border-gray-800"
			}`}
		>
			{meetings.data ? (
				<>
					<CommonButton
						children={RefreshIcon}
						type="button"
						hasUniqueColor={` ${
							theme === "dark"
								? "text-white-500 bg-transparent-400  border-transparent-100"
								: "border-gray-800 b text-black-400 bg-white-100 "
						}`}
						extraClass={`w-8 h-8 text-xs`}
						onClickHandler={refreshHandler}
					/>
					<div
						className={`flex p-1 rounded-lg border  ${
							theme === "dark" ? "bg-transparent-400 border-transparent-0" : "border-gray-800"
						}`}
					>
						<CommonButton
							children="Upcoming"
							type="button"
							hasUniqueColor={`text-xs ${
								status === "upcoming"
									? theme === "dark"
										? "font-semibold text-white-500 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 b text-black-400 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							extraClass=" h-7 px-4  "
							onClickHandler={upcomingHandler}
						/>
						<CommonButton
							children="Ongoing"
							type="button"
							hasUniqueColor="text-xs "
							extraClass={` h-7 px-4   ${
								status === "ongoing"
									? theme === "dark"
										? "font-semibold text-white-500 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 b text-black-400 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							onClickHandler={ongoingHandler}
						/>
						<CommonButton
							children="Ended"
							type="button"
							hasUniqueColor="text-xs "
							extraClass={` h-7 px-4   ${
								status === "ended"
									? theme === "dark"
										? "font-semibold text-white-500 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 b text-black-400 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							onClickHandler={endedHandler}
						/>
					</div>
					<CommonButton
						children={PlusCircleOutlineIcon}
						type="button"
						hasUniqueColor={` ${
							theme === "dark"
								? "text-white-500 bg-transparent-400  border-transparent-100"
								: "border-gray-800 b text-black-400 bg-white-100 "
						}`}
						extraClass={`w-8 h-8 text-xs `}
						onClickHandler={navigateHandler}
					/>
				</>
			) : (
				<MessageDisplay hasBackground={true} height="h-10" />
			)}
		</div>
	);
};
