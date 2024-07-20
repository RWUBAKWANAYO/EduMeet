import { useContext } from "react";
import { RenderAvatar } from "../../utils/RenderAvatar";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { ChevronRightIcon } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useConfirmInvitation, useFilterInvitations } from "../invitations/useInvitations";
import { MessageDisplay } from "../shared/MessageDisplay";
import { errorFormat } from "../../utils";
import moment from "moment";
import { useInvitations } from "./useHome";

export const Invitations = () => {
	const { theme } = useContext(UIContext);
	const { isLoading, error, data } = useFilterInvitations({
		role: "receiver",
		status: "pending",
	});
	const { mutate: acceptInviteHandler } = useConfirmInvitation();
	const { getPendingInvite } = useInvitations();
	return (
		<div
			className={`py-4 w-full grow rounded-lg border ${
				theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
			}`}
		>
			<div
				className={` flex px-4 pt-2 pb-4 mb-4 border-b ${
					theme === "dark" ? " border-transparent-90" : " border-gray-800"
				}`}
			>
				<h3
					className={`text-xs  font-medium ${
						theme === "dark" ? "text-transparent-300" : "text-black-400"
					}`}
				>
					Pending invitations
				</h3>
			</div>
			{isLoading ? (
				<MessageDisplay height="min-h-48" />
			) : error ? (
				<MessageDisplay height="min-h-48" message={errorFormat(error)} />
			) : data?.data.length === 0 ? (
				<MessageDisplay message="No Pending invitations available" height="min-h-48" />
			) : (
				<>
					{data &&
						getPendingInvite(data?.data)
							.slice(0, 4)
							.map((invite, index: number) => (
								<div
									className={`mx-4  flex space-x-4 justify-between  space-x-2 py-3 border-b ${
										theme === "dark" ? " border-transparent-90" : " border-gray-800"
									} ${index === getPendingInvite(data?.data).length - 1 ? "mb-6" : ""}`}
								>
									<div
										className={` flex-1 flex space-x-2 ${
											theme === "dark" ? "text-transparent-300" : "text-black-400"
										}`}
									>
										<RenderAvatar
											photo={invite.sender_id?.photo || ""}
											fullName={invite.sender_id?.full_name || ""}
											hasExtraClass={`w-9 h-9  rounded-full`}
										/>
										<div className="space-y-1 flex-1">
											<h4
												className={`text-xs font-medium  ${
													theme === "dark" ? "text-white-800" : "text-black-600"
												}`}
											>
												{moment(invite.meeting_id?.createdAt).format("dddd, MMMM Do YYYY")}
											</h4>
											<p
												className={`text-xs mt-2 font-light ${
													theme === "dark" ? "text-transparent-300" : "text-white-500"
												}`}
											>
												{`${invite.sender_id?.full_name} invite you to join meeting: "${invite.meeting_id?.title}"`}
											</p>
										</div>
									</div>
									<div>
										<CommonButton
											hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
											children="Accept"
											type="button"
											extraClass="h-8 px-4 text-xs font-semi-bold"
											onClickHandler={() => acceptInviteHandler(invite._id!)}
										/>
									</div>
								</div>
							))}
					{data && getPendingInvite(data?.data).length > 4 && (
						<div className="w-full flex justify-center pb-4">
							<Link to="/invitations" className="text-blue-100 text-sm flex items-center">
								View more &nbsp; {ChevronRightIcon}
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	);
};
