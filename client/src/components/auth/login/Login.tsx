import React, { useContext } from "react";
import { useLogin } from "./useLogin";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton } from "../../shared/buttons";
import { errorFormat } from "../../../utils";
import { SubmittingSpinner } from "../../shared/spinners/Spinners";
import { TestingAuth } from "../TestingAuth";

export const Login: React.FC<{ pageHandler: (status: boolean) => void }> = ({ pageHandler }) => {
	const { theme } = useContext(UIContext);
	const { emailRef, passwordRef, handleSubmit, isLoading, error } = useLogin();

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
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
							? "bg-transparent-400 text-white-800 border-transparent-100"
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
					placeholder="Enter your password"
					required
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
					hasUniqueColor="bg-blue-40 border-transparent-0 text-white-100"
					children="Login"
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
				className={`text-xs font-normal flex justify-center ${
					theme === "dark" ? "text-white-800" : "text-black-600"
				}`}
			>
				You don't have account? &nbsp;
				<button type="button" className="text-blue-40" onClick={() => pageHandler(false)}>
					Singup instead!
				</button>
			</div>
		</form>
	);
};
