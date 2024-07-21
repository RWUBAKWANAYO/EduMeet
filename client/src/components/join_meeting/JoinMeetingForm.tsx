import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { useJoinMeetingForm } from "./useJoinMeetingForm";
import logo from "../../assets/images/logo.png";
import { errorFormat } from "../../utils";
import { SubmittingSpinner } from "../shared/spinners/Spinners";

export const JoinMeetingForm = () => {
	const { theme } = useContext(UIContext);
	const { name, nameHandler, meetingIdRef, passcodeRef, onSubmitHandler, isLoading, error } =
		useJoinMeetingForm();
	return (
		<div
			className={`w-full sm:w-96 pt-10 pb-16 px-8 rounded shadow ${
				theme === "dark" ? "bg-blue-600" : "bg-white-100"
			}`}
		>
			<div className="w-full flex flex-col items-center space-y-2 mb-8">
				<img src={logo} alt="logo" className="w-12" />
				<h1
					className={`text-md font-medium ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Join a meeting with a meeting Id
				</h1>
			</div>
			<form className="space-y-4" onSubmit={onSubmitHandler}>
				<div className="w-full flex flex-col space-y-3">
					<label
						className={`text-xs font-medium ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						Meeting ID &nbsp;
						<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
					</label>
					<input
						type="number"
						placeholder="Type a meeting ID"
						ref={meetingIdRef}
						required
						className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
							theme === "dark"
								? "bg-transparent-400 text-white-800 border-transparent-100"
								: "border-gray-800"
						}`}
					/>
				</div>
				<div className="w-full flex flex-col space-y-3">
					<label
						className={`text-xs font-medium ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						Meeting Passcode
					</label>
					<input
						type="number"
						placeholder="Type a meeting Passcode"
						ref={passcodeRef}
						className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
							theme === "dark"
								? "bg-transparent-400 text-white-800 border-transparent-100"
								: "border-gray-800"
						}`}
					/>
					<small className={`text-[10px] font-medium text-gray-200`}>
						N.B: Passcode required only for private meeting
					</small>
				</div>
				<div className="w-full flex flex-col space-y-3 pb-4">
					<label
						className={`text-xs font-medium ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
					>
						Full Name &nbsp;
						<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
					</label>
					<input
						type="text"
						placeholder="Enter your full name"
						value={name.value}
						disabled={name.input}
						required
						onChange={nameHandler}
						className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
							theme === "dark"
								? "bg-transparent-400 text-white-800 border-transparent-100"
								: "border-gray-800"
						}`}
					/>
				</div>
				<div className="h-2 flex flex-col justify-center">
					{error && (
						<small className={`text-xs font-normal text-red-500`}>{errorFormat(error)}</small>
					)}
				</div>
				<div className="w-full relative h-fit">
					<CommonButton
						hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
						children="Send"
						type="submit"
						extraClass="w-full h-10 px-4 text-xs font-semibold"
					/>
					{isLoading && <SubmittingSpinner colors="bg-blue-100 text-white-100" size="w-8 h-8" />}
				</div>
			</form>
		</div>
	);
};
