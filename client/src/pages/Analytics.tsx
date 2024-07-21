import { useContext } from "react";
import { ActivitiesCount, ActivitiesDetails, Participants } from "../components/analytics";
import { UIContext } from "../hooks/context/UIContext";
import { useAnalytics } from "../components/analytics/useAnalytics";
import { IUser } from "../types/users.interface";
import { UserContext } from "../hooks/context/UserContext";
import { MessageDisplay } from "../components/shared/MessageDisplay";

export const Analytics = () => {
	const { theme } = useContext(UIContext);
	const { user } = useContext(UserContext);
	const { isLoading, error, data, selectedStat, selectStatHandler } = useAnalytics();
	return (
		<div className="w-full">
			{isLoading ? (
				<div className="p-3 lg:p-8 space-y-4">
					<div>
						<MessageDisplay hasBackground={true} height="h-80" />
					</div>
					<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
						{Array.from({ length: 5 }).map(() => (
							<MessageDisplay hasBackground={true} height="h-[200px]" />
						))}
					</div>
				</div>
			) : (
				data?.data &&
				selectedStat?.meeting && (
					<div className="w-full flex">
						{!error && (data?.data[0].meeting.host as IUser)?._id === user?._id && (
							<Participants
								data={data}
								selectStatHandler={selectStatHandler}
								selectedStat={selectedStat}
							/>
						)}
						<div
							className={`flex-1 h-full  ${
								(data?.data[0].meeting.host as IUser)?._id === user?._id
									? `p-4 lg:p-8 lg:pr-4 lg:pl-4 sm:border-l ${
											theme === "dark" ? "border-transparent-400" : "border-gray-800"
									  }`
									: "p-4 lg:p-8 lg:pr-4"
							}`}
						>
							{selectedStat?.meeting ? (
								<>
									<h3
										className={`pb-2 text-lg font-medium ${
											theme === "dark" ? "text-white-800" : "tetx-black-600"
										}`}
									>
										{selectedStat.user.full_name}
									</h3>
									<div
										className={`w-full h-full space-y-3 overflow-auto pr-0 lg:pr-4`}
										style={{ height: "calc(100vh - 160px)" }}
									>
										{<ActivitiesCount selectedStat={selectedStat} />}
										{<ActivitiesDetails selectedStat={selectedStat} />}
									</div>
								</>
							) : (
								<MessageDisplay
									hasBackground={true}
									styles={{ height: "calc(66vh + 66px)" }}
									message="No stats found"
								/>
							)}
						</div>
					</div>
				)
			)}
		</div>
	);
};
