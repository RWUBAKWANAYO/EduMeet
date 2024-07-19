import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { MessageDisplay } from "../shared/MessageDisplay";
import { errorFormat } from "../../utils";
import moment from "moment";
import { useFetchMeetings } from "../meetings/useMeetings";
import { IUser } from "../../types/users.interface";
import { XMark } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

export const MeetingToAnalyze = () => {
	const { theme, closeModal } = useContext(UIContext);

	const { isLoading, error, data } = useFetchMeetings({
		status: "ended",
	});
	const navigate = useNavigate();
	const analyzeHandler = (meetingId: string) => {
		closeModal();
		navigate(`/meetings/${meetingId}/analytics`);
	};
	return (
		<div
			className={`relative py-8 min-w-[450px] min-h-[400px] ${
				theme === "dark" ? "bg-blue-700" : "bg-white-100"
			}`}
		>
			<CommonButton
				children={XMark()}
				type="button"
				extraClass={`w-8 h-8 text-xs absolute top-0 right-0 rounded-none border-none`}
				onClickHandler={closeModal}
			/>
			{isLoading ? (
				<MessageDisplay message="Loading...." />
			) : error ? (
				<MessageDisplay message={errorFormat(error)} />
			) : (
				data?.data && (
					<>
						<div className={`px-6 w-full flex items-center space-x-6 my-6`}>
							<h4
								className={`text-base font-medium ${
									theme === "dark" ? "text-white-800" : "text-black-600"
								}`}
							>
								Meetings to Analyze
							</h4>
						</div>
						<div className="w-[450px] h-[400px] overflow-auto px-6">
							{data?.data.map((meeting) => (
								<div
									key={meeting._id}
									className={`mb-2 p-4 flex items-center space-x-3 shadow   ${
										theme === "dark" ? "bg-blue-600" : "bg-white-100 border-gray-800 "
									}`}
								>
									<div className="flex-1 space-y-1">
										<h4
											className={`text-sm ${
												theme === "dark" ? "text-white-800" : "text-black-600"
											}`}
										>
											{meeting?.title}
										</h4>
										<p
											className={`text-xs font-light ${
												theme === "dark" ? "text-transparent-300" : "text-black-400"
											}`}
										>
											{`Meeting "${meeting?.title}" hosted by ${
												(meeting?.host as IUser)?.full_name
											} on ${moment(meeting?.start_time).format("MMM Do YYYY")}`}
										</p>
									</div>

									<CommonButton
										hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
										children="Analyze"
										type="button"
										extraClass="h-8 px-4 text-xs font-semi-bold"
										onClickHandler={() => analyzeHandler(meeting._id || "")}
									/>
								</div>
							))}
						</div>
					</>
				)
			)}
		</div>
	);
};
