import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton, CommonClipboard } from "../../shared/buttons";
import {
	CheckIcon,
	ContactIcon,
	PencilIcon,
	PlusCircleIcon,
	TrashIcon,
	XMark,
} from "../../../assets/icons";
import { CommonCard } from "../../shared/cards/CommonCard";
import { MeetingsContext } from "../../../hooks/context/meetings/MeetingsContext";
import { meetingDisplayTime } from "../../../utils";

import AddParticipants from "../add_participants/AddParticipants";
import { MessageCard } from "../../shared/cards/MessageCard";
import { BadgeCard } from "../../shared/cards";
import { useMeetingDetails } from "./useMeetingDetails";
import { useDeleteMeeting, useEditMeeting, useMeetings } from "../useMeetings";
import { EditMeeting } from "../EditMeeting";
import { UserContext } from "../../../hooks/context/UserContext";

export const MeetingDetails: React.FC = () => {
	const { theme, openModal, closeModal } = useContext(UIContext);
	const { selectedMeeting: meeting } = useContext(MeetingsContext);

	const {
		meetingControls,
		data,
		error,
		isLoading,
		inviteHandler,
		navigateToanalytics,
		joinMeetingHandler,
	} = useMeetingDetails();
	const { mutate: deleteMeeting } = useDeleteMeeting();
	const { mutate: editMeeting } = useEditMeeting();
	const { allParticipants } = useMeetings();
	const { user } = useContext(UserContext);
	return (
		<div className="w-full">
			{meeting ? (
				<>
					<div
						className={`mt-0 border-b pb-6 ${
							theme === "dark" ? " border-transparent-400" : "border-gray-800"
						}`}
					>
						<h3
							className={`text-2xl font-semi-bold ${
								theme === "dark" ? "text-white-800" : "text-black-600"
							}`}
						>
							{meeting.title}
						</h3>
						<p
							className={`text-xs mt-2 font-light ${
								theme === "dark" ? "text-transparent-300" : "text-black-400"
							}`}
						>
							⏰ {meetingDisplayTime(meeting.start_time, meeting.end_time, meeting.status)}
						</p>
					</div>
					<div
						className={`mt-0 border-b flex  space-x-2 items-center  py-6 ${
							theme === "dark" ? " border-transparent-400" : "border-gray-800"
						}`}
					>
						{meeting.status !== "ended" && (
							<CommonButton
								hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
								children="Join Room"
								type="button"
								extraClass=" h-8 px-4 text-xs font-semi-bold "
								onClickHandler={() => joinMeetingHandler()}
							/>
						)}
						{meeting.status == "ended" && (
							<CommonButton
								hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
								children="View Analytics"
								type="button"
								extraClass=" h-8 px-4 text-xs font-semi-bold "
								onClickHandler={() => navigateToanalytics()}
							/>
						)}

						<CommonClipboard
							inputData={`${process.env.REACT_APP_PROJECT_HOST}/join-meeting/${meeting.session_id}`}
							displayData="Link"
							extraClass={`w-[90px]`}
							hasUniqueColor={`${
								theme === "dark"
									? "border-transparent-100 bg-transparent-400 text-transparent-300"
									: "border-gray-800 bg-white-100 text-black-600"
							}`}
							tostData="Link"
						/>

						{meeting.status === "upcoming" && meeting.host === user?._id && (
							<>
								<CommonButton
									children={PencilIcon}
									type="button"
									hasUniqueColor={` ${
										theme === "dark"
											? "text-white-500 bg-transparent-400  border-transparent-100"
											: "border-gray-800 b text-black-400 bg-white-100 "
									}`}
									extraClass="w-8 h-8 text-xs font-semi-bold "
									onClickHandler={() =>
										openModal(
											<EditMeeting
												meeting={meeting}
												cancelHandler={() => closeModal()}
												editHandler={(data) => editMeeting(data)}
											/>
										)
									}
								/>
								<CommonButton
									children={TrashIcon}
									type="button"
									hasUniqueColor={` ${
										theme === "dark"
											? "text-white-500 bg-transparent-400  border-transparent-100"
											: "border-gray-800 b text-black-400 bg-white-100 "
									}`}
									extraClass="w-8 h-8 text-xs font-semi-bold "
									onClickHandler={() =>
										openModal(
											<MessageCard
												title="Delete Meeting"
												message="Are you sure you want to delete this meeting? This action is irreversible, and all associated details will be permanently removed. This cannot be undone."
												cancelButtonHandler={() => closeModal()}
												actionButtonHandler={() => deleteMeeting(meeting._id)}
											/>
										)
									}
								/>
							</>
						)}
					</div>
					<div
						className={`mt-0 border-b py-6 ${
							theme === "dark" ? " border-transparent-400" : "border-gray-800"
						}`}
					>
						<p
							className={`text-[13px]  font-light leading-5 ${
								theme === "dark" ? "text-transparent-300" : "text-black-400"
							}`}
						>
							{meeting.description}
						</p>
					</div>
					<div
						className={`mt-0 border-b py-6 flex flex-wrap gap-4 ${
							theme === "dark" ? "border-transparent-400" : "border-gray-800"
						}`}
					>
						{meetingControls().map((control) => (
							<div key={control._id}>
								<BadgeCard
									icon={control.status ? CheckIcon("size-3") : XMark("size-3")}
									title={control.title}
								/>
							</div>
						))}
					</div>

					<div
						className={`mt-0 border-b py-6 flex items-center ${
							theme === "dark" ? " border-transparent-400" : "border-gray-800"
						}`}
					>
						<CommonClipboard inputData={meeting.session_id} displayData="id" tostData="ID" />
						<div className="flex flex-col items-center grow space-y-4">
							<p
								className={`text-xs  font-light ${
									theme === "dark" ? "text-transparent-300" : "text-black-400"
								}`}
							>
								Meeting Id
							</p>
							<h3
								className={`text-2xl font-bold tracking-widest ${
									theme === "dark" ? "text-white-800" : "text-black-600"
								}`}
							>
								{meeting.session_id}
							</h3>
						</div>
					</div>

					<div className={`mt-0 py-6 }`}>
						<div
							className={`flex items-center gap-x-1 pb-6 text-sm font-normal ${
								theme === "dark" ? "text-transparent-300" : "text-black-400"
							}`}
						>
							{ContactIcon} <p>Participants</p>
						</div>
						<div className=" w-full h-fit  flex flex-wrap   gap-2 ">
							{allParticipants(meeting).map((participant) => (
								<div className="w-[100px]" key={participant._id}>
									<CommonCard
										card={{
											title: `${participant.full_name}`,
											photo: participant.photo || "",
											hasImage: true,
										}}
									/>
								</div>
							))}
							{meeting.status !== "ended" && (
								<div
									className="w-[100px]"
									onClick={() =>
										openModal(
											<AddParticipants
												data={data}
												error={error}
												isLoading={isLoading}
												onSubmitHandler={inviteHandler}
											/>
										)
									}
								>
									<CommonCard
										card={{
											title: "Invite Member",
											icon: PlusCircleIcon,
											hasImage: false,
											hasUniqueColor: `bg-blue-100 text-white-100`,
										}}
									/>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<p
					className={`text-xs w-fit text-center ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					No meeting selected
				</p>
			)}
		</div>
	);
};
