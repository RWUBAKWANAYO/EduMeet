import React, { useContext } from "react";
import { useSignup } from "./useSignup";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton } from "../../shared/buttons";
import { errorFormat, textSlice } from "../../../utils";
import { SubmittingSpinner } from "../../shared/spinners/Spinners";
import { TestingAuth } from "../TestingAuth";
import { useLogin } from "../login/useLogin";

export const Signup: React.FC<{ pageHandler: (status: boolean) => void }> = ({ pageHandler }) => {
	const { theme } = useContext(UIContext);
	const { emailRef, nameRef, photo, photoHandler, passwordRef, handleSubmit, isLoading, error } =
		useSignup();

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<div className="w-full flex flex-col space-y-3">
				<label
					htmlFor="name"
					className={`text-xs font-medium ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Full Name &nbsp;
					<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
				</label>
				<input
					type="name"
					id="name"
					ref={nameRef}
					placeholder="Enter your Full Name"
					required
					className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
						theme === "dark"
							? "bg-blue-600 text-white-800 border-transparent-100"
							: "border-gray-800"
					}`}
				/>
			</div>
			<div className="w-full flex flex-col space-y-3">
				<label
					htmlFor="email"
					className={`text-xs font-medium ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Email &nbsp;
					<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
				</label>
				<input
					type="email"
					id="email"
					ref={emailRef}
					placeholder="Enter your Email"
					required
					className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
						theme === "dark"
							? "bg-blue-600 text-white-800 border-transparent-100"
							: "border-gray-800"
					}`}
				/>
			</div>
			<div className="w-full flex flex-col space-y-3">
				<label
					htmlFor="password"
					className={`text-xs font-medium ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Password &nbsp;
					<span className="text-red-500 text-lg leading-[0px] align-middle">*</span>
				</label>
				<input
					type="password"
					id="password"
					ref={passwordRef}
					placeholder="Enter your  Password"
					required
					className={`w-full h-10 px-4 rounded-md  border outline-none text-xs mb-4  ${
						theme === "dark"
							? "bg-blue-600 text-white-800 border-transparent-100"
							: "border-gray-800"
					}`}
				/>
			</div>
			<div className="w-full flex flex-col space-y-3">
				<label
					htmlFor="password"
					className={`text-xs font-medium ${
						theme === "dark" ? "text-white-800" : "text-black-600"
					}`}
				>
					Profile Image &nbsp;
				</label>
				<div
					className={`w-full h-10 rounded-md  border outline-none text-xs mb-4 relative ${
						theme === "dark" ? "border-transparent-100" : "border-gray-800"
					}`}
				>
					<input
						type="file"
						id="file"
						accept="image/*"
						onChange={photoHandler}
						className={`w-full h-full absolute absolute top-0 left-0 opacity-0 z-10 px-4 rounded-md  border-none text-xs bg-transparent-0`}
					/>
					<div
						className={`  w-full h-full rounded-md relative z-0 flex items-center ${
							theme === "dark" ? "bg-blue-600" : "bg-white-100"
						}`}
					>
						{photo && (
							<img src={URL.createObjectURL(photo)} alt="Preview" className="h-10 rounded-l-md" />
						)}
						<small
							className={`ml-4 text-xs ${
								theme === "dark" ? (!photo ? "text-white-500" : "text-white-800") : ""
							}`}
						>
							{photo ? textSlice(photo.name, 33) : "Upload your profile picture"}
						</small>
					</div>
				</div>
			</div>
			<div className="h-2 flex flex-col justify-center">
				{error && (
					<small className={`text-xs font-normal text-red-500`}>{errorFormat(error)}</small>
				)}
			</div>
			<div className="w-full relative h-fit">
				<CommonButton
					hasUniqueColor="bg-blue-40 border-transparent-0 text-white-100"
					children="Signup"
					type="submit"
					extraClass="w-full h-10 px-4 text-xs font-semibold mt-3"
				/>
				{isLoading && <SubmittingSpinner colors="bg-blue-40 text-white-100" size="w-7 h-7" />}
			</div>

			<div className="flex w-full items-center ">
				<hr
					className={`flex-1 h-[1px] border-none ${
						theme === "dark" ? "bg-transparent-200" : "bg-gray-800"
					}`}
				/>
				<span
					className={`text-md font-2xl px-4 ${
						theme === "dark" ? "text-transparent-200" : "text-black-400"
					}`}
				>
					or
				</span>
				<hr
					className={`flex-1 h-[1px] border-none ${
						theme === "dark" ? "bg-transparent-200" : "bg-gray-800"
					}`}
				/>
			</div>
			<TestingAuth />
			<div
				className={`text-xs font-normal flex justify-center  ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				You don't have account? &nbsp;
				<button type="button" className="text-blue-40" onClick={() => pageHandler(false)}>
					Login instead!
				</button>
			</div>
		</form>
	);
};
