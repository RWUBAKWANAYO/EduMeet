import { useContext } from "react";
import { ActivitiesCount, ActivitiesDetails, Participants } from "../components/analytics";
import { UIContext } from "../hooks/context/UIContext";
import { useAnalytics } from "../components/analytics/useAnalytics";
import { MessageDisplay } from "../components/shared/MessageDisplay";
import { errorFormat } from "../utils";
import { IUser } from "../types/users.interface";
import { UserContext } from "../hooks/context/UserContext";

export const Analytics = () => {
	const { theme } = useContext(UIContext);
	const { user } = useContext(UserContext);
	const { isLoading, error, data, selectedStat, selectStatHandler } = useAnalytics();
	return (
		<div className="w-full">
			{isLoading ? (
				<MessageDisplay message="Loading...." />
			) : error ? (
				<MessageDisplay message={errorFormat(error)} />
			) : (
				data?.data &&
				selectedStat?.meeting && (
					<div className="w-full flex">
						{(data.data[0].meeting.host as IUser)?._id === user?._id && (
							<div
								className={`overflow-auto w-fit md:w-[270px] lg:w-[320px] h-full p-3 pr-0  lg:p-8 lg:pr-0 `}
							>
								<div className={`w-full `}>
									<h3
										className={`hidden md:flex pb-4 text-sm ${
											theme === "dark" ? "text-white-800" : "tetx-black-600"
										}`}
									>
										Participants
									</h3>
									<>{console.log(data?.data)}</>

									<Participants
										data={data}
										selectStatHandler={selectStatHandler}
										selectedStat={selectedStat}
									/>
								</div>
							</div>
						)}
						<div
							className={`flex-1 h-full p-3 pl-0 lg:p-8 lg:pl-3 ${
								(data.data[0].meeting.host as IUser)?._id === user?._id
									? `pl-4 sm:border-l ${
											theme === "dark" ? "border-transparent-400" : "border-gray-800"
									  }`
									: "pl-8"
							}`}
						>
							<h3
								className={`pb-2 text-lg font-medium ${
									theme === "dark" ? "text-white-800" : "tetx-black-600"
								}`}
							>
								Oliver Rwubakwanayo stats
							</h3>
							<div
								className={`w-full h-full space-y-3 overflow-auto`}
								style={{ height: "calc(100vh - 160px)" }}
							>
								{<ActivitiesCount selectedStat={selectedStat} />}
								{<ActivitiesDetails selectedStat={selectedStat} />}
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
};
