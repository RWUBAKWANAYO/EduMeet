import React, { useContext } from "react";
import { UIContext } from "../hooks/context/UIContext";
import { CheckIcon, ClockIcon, NoSymbolIcon } from "../assets/icons";
import { errorFormat, RenderAvatar, textSlice } from "../utils";
import { CommonButton } from "../components/shared/buttons";
import { BadgeCard } from "../components/shared/cards";
import { useConfirmInvitation, useInvitations } from "../hooks/custom";
import { MessageDisplay } from "../components/shared/MessageDisplay";
import { UserContext } from "../hooks/context/UserContext";
import moment from "moment";

export const Invitations: React.FC = () => {
	const { theme } = useContext(UIContext);
	const { user } = useContext(UserContext);
	const { isLoading, error, data, filter, filterChangeHandler } = useInvitations();

	const { mutate } = useConfirmInvitation();
	return (
		<div className={`w-full  p-8 space-y-4`}>
			{isLoading ? (
				<MessageDisplay message="Loading...." />
			) : error ? (
				<MessageDisplay message={errorFormat(error)} />
			) : (
				<>
					<div className={`flex w-fit p-1`}>
						<CommonButton
							children="All"
							type="button"
							hasUniqueColor={`text-xs ${
								filter === "all"
									? theme === "dark"
										? "font-semibold text-white-800 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 text-black-600 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							extraClass=" h-8 px-8 "
							onClickHandler={() => filterChangeHandler("all")}
						/>
						<CommonButton
							children="Sent"
							type="button"
							hasUniqueColor="text-xs "
							extraClass={` h-8 px-8   ${
								filter === "sender"
									? theme === "dark"
										? "font-semibold text-white-800 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 text-black-600 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							onClickHandler={() => filterChangeHandler("sender")}
						/>
						<CommonButton
							children="Received"
							type="button"
							hasUniqueColor="text-xs "
							extraClass={` h-8 px-8   ${
								filter === "receiver"
									? theme === "dark"
										? "font-semibold text-white-800 bg-transparent-400  border-transparent-100"
										: "font-semibold border-gray-800 text-black-600 bg-white-100 "
									: theme === "dark"
									? "text-transparent-300 border-transparent-0"
									: "text-black-400 border-transparent-0"
							}`}
							onClickHandler={() => filterChangeHandler("receiver")}
						/>
					</div>
					<div className={`w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4`}>
						{data?.data.map((invite) => (
							<div
								className={`rounded-lg border overflow-hidden ${
									theme === "dark"
										? "text-transparent-300 border-transparent-90"
										: "text-black-400  border-gray-800"
								}`}
							>
								<div
									className={`flex px-6 pt-6 pb-4 text-sm  space-x-3 items-center  ${
										theme === "dark" ? "bg-transparent-400 " : "bg-white-600"
									}`}
								>
									<RenderAvatar
										photo={
											user?._id === invite.sender_id._id
												? invite.receiver_id?.photo
												: invite.sender_id?.photo
										}
										fullName={"item?.user?.full_name"}
										hasExtraClass="w-12 h-12 rounded-full"
									/>
									<div className="flex-1 items-center space-y-1">
										<h3
											className={` text-sm  font-semibold ${
												theme === "dark" ? "text-white-800" : "text-black-600"
											}`}
										>
											{textSlice(
												`${
													user?._id === invite.sender_id._id
														? invite.receiver_id?.full_name
														: invite.sender_id?.full_name
												}`,
												27
											)}
										</h3>
										<p className="font-light text-xs ">
											{textSlice(
												`${
													user?._id === invite.sender_id._id
														? invite.receiver_id?.email
														: invite.sender_id?.email
												}` ?? "",
												27
											)}
										</p>
									</div>
								</div>
								<div
									className={`pb-8 h-full ${theme === "dark" ? "bg-blue-800 " : "bg-white-100 "}
            `}
								>
									<div className="p-6 flex  space-x-3">
										<p className="text-xs font-normal leading-6">
											{user?._id === invite.sender_id._id
												? `You have invited Humble to join the meeting "${
														invite.meeting_id?.title
												  }" on
											${moment(invite.meeting_id?.start_time).format("MMMM Do YYYY, h:mm")}`
												: `You have been invited to by Bob to join the meeting "${
														invite.meeting_id?.title
												  }" on
								    ${moment(invite.meeting_id?.start_time).format("MMMM Do YYYY, h:mm a")}`}
										</p>
									</div>
									<div className="px-6 w-full">
										{invite.status === "accepted" ? (
											<BadgeCard icon={CheckIcon("size-3")} title={"Accepted"} />
										) : user?._id === invite.sender_id._id && invite.status === "pending" ? (
											<BadgeCard icon={ClockIcon} title={invite.status} />
										) : invite.meeting_id?.status === "ended" ? (
											<BadgeCard
												icon={NoSymbolIcon("size-3")}
												title={"Meeting End with pending Invite"}
											/>
										) : (
											<CommonButton
												type="button"
												children="Accept"
												hasUniqueColor="text-white-100"
												extraClass="text-xs font-medium bg-blue-100 w-full px-4 py-2 border-transparent-0 rounded-md shadow:sm"
												onClickHandler={() => mutate(invite._id!)}
											/>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};
