import React, { useContext } from "react";
import { textSlice } from "../../utils";
import { UIContext } from "../../hooks/context/UIContext";
import { ChevronRightIcon } from "../../assets/icons";
import { IFilterStatsResponse, IStat } from "./types";

interface IParticipantsProps {
	data?: IFilterStatsResponse;
	selectStatHandler: (stat: IStat) => void;
	selectedStat: IStat;
}

export const Participants: React.FC<IParticipantsProps> = ({
	data,
	selectStatHandler,
	selectedStat,
}) => {
	const { theme } = useContext(UIContext);
	return (
		<div className={`min-w-16 w-fit md:w-[270px] lg:w-[320px] h-full p-4 pr-0  lg:p-8 lg:pr-0 `}>
			{data?.data && selectedStat?.meeting && (
				<>
					<h3
						className={`hidden md:flex pb-4 text-sm ${
							theme === "dark" ? "text-white-800" : "tetx-black-600"
						}`}
					>
						Participants
					</h3>{" "}
					<div
						className={`w-full overflow-auto sm:pr-4 space-y-3`}
						style={{ height: "calc(100vh - 160px)" }}
					>
						{data.data.map((stat) => (
							<div
								key={stat._id}
								onClick={() => selectStatHandler(stat)}
								className={`cursor-pointer flex w-full items-center justify-between space-x-2 px-4 py-2 rounded-lg border ${
									theme === "dark"
										? `border-transparent-90 ${
												selectedStat._id === stat._id ? "bg-blue-300" : "bg-blue-800"
										  }`
										: `bg-white-100 border-gray-800 ${
												selectedStat._id === stat._id ? "bg-white-600" : "bg-white-100"
										  }`
								} `}
							>
								<div className={`flex-1 flex md:space-x-2 items-center`}>
									<img src={stat.user?.photo} alt="avatar" className="w-8 h-8 rounded-full " />
									<div className="flex-1 space-y-0.5">
										<div className="hidden md:block w-full">
											<h4
												className={`text-sm ${
													theme === "dark" ? "text-white-800" : "text-black-600"
												}`}
											>
												{textSlice(stat.user?.full_name || "", 18)}
											</h4>
											<p
												className={`text-xs font-light ${
													theme === "dark" ? "text-transparent-300" : "text-black-400"
												}`}
											>
												{textSlice(stat.user?.email || "", 18)}
											</p>
										</div>
									</div>
								</div>
								<button
									className={` ${
										theme === "dark" ? "hidden md:block text-white-800" : "text-black-600"
									}`}
								>
									{ChevronRightIcon}
								</button>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};
