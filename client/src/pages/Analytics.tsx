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
							<div className={` w-[320px] h-full  py-8 pl-8 pr-0 `}>
								<div className={`w-full `} style={{ height: "calc(100vh - 60px)" }}>
									<h3
										className={`pb-4 text-sm ${
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
							className={`flex-1 h-full  py-8 pr-8 ${
								(data.data[0].meeting.host as IUser)?._id === user?._id
									? `pl-4 border-l ${
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
							<div className={`w-full h-full space-y-3 overflow-auto`}>
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
