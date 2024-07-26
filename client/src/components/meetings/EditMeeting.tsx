import React, { useContext, useState } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../../components/shared/buttons";
import { IMeetingData } from "../../types/meetings.interface";
import { EditIcon } from "../../assets/icons";

interface IEditMeeting {
	cancelHandler: () => void;
	editHandler: (meeting: IMeetingData) => void;
	meeting: IMeetingData;
}

export const EditMeeting: React.FC<IEditMeeting> = ({ meeting, cancelHandler, editHandler }) => {
	const { theme } = useContext(UIContext);
	const [title, setTitle] = useState(meeting.title);
	const [description, setDescription] = useState(meeting.description);

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		const data: IMeetingData = {
			_id: meeting._id,
			title,
			description,
		};
		editHandler(data);
	};
	return (
		<div
			className={`w-screen h-screen sm:h-[400px] sm:w-[450px] sm:rounded:md pt-10 pb-16 px-8 shadow rounded-lg ${
				theme === "dark" ? "bg-blue-600" : "bg-white-100"
			}`}
		>
			<div
				className={`flex items-center space-x-4 mb-6 ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				{EditIcon}
				<h1 className={` text-xl font-normal`}>Edit Meeting</h1>
			</div>

			<form className="space-y-6" onSubmit={onSubmitHandler}>
				<div
					className={`w-full flex flex-col  border-b ${
						theme === "dark" ? " border-transparent-400" : "border-gray-800 "
					}`}
				>
					<label
						className={`text-xs font-normal ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						Meeting Title &nbsp;
						<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
					</label>
					<input
						type="text"
						placeholder="Edit Meeting Title here..."
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
						className={`w-full border-none outline-none bg-transparent-0 text-xs  py-2 text-gray-200`}
					/>
				</div>
				<div
					className={`w-full flex flex-col  border-b ${
						theme === "dark" ? " border-transparent-400" : "border-gray-800 "
					}`}
				>
					<label
						className={`text-xs font-normal ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						Meeting Description &nbsp;
						<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
					</label>
					<input
						type="text"
						placeholder="Edit Meeting Description here..."
						value={description}
						required
						onChange={(e) => setDescription(e.target.value)}
						className={`w-full border-none outline-none bg-transparent-0 text-xs  py-2 text-gray-200`}
					/>
				</div>

				<div className="w-full grid grid-cols-1 sm:grid-cols-2  space-y-4 sm:space-y-0 sm:space-x-4 pt-2 ">
					<CommonButton
						children="Cancel"
						type="button"
						hasUniqueColor={` ${
							theme === "dark"
								? "text-white-300 bg-transparent-400  border-transparent-100"
								: "border-gray-800 b text-black-400 bg-white-100 "
						}`}
						extraClass=" shadow-sm py-2 px-4 text-xs font-semibold"
						onClickHandler={() => cancelHandler()}
					/>
					<CommonButton
						hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
						children="Save"
						type="submit"
						extraClass=" shadow-sm py-2 px-4 text-xs font-semibold "
					/>
				</div>
			</form>
		</div>
	);
};
