import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { CommonButton } from "../shared/buttons";
import { ContactIcon } from "../../assets/icons";
import { useLogin } from "./login/useLogin";
import { SubmittingSpinner } from "../shared/spinners/Spinners";
import { errorFormat } from "../../utils";

export const TestingAuth: React.FC = () => {
	const { theme } = useContext(UIContext);
	const { isLoading, error, handleTestAccountAuth } = useLogin();
	return (
		<>
			{error && (
				<div className="flex flex-col justify-center">
					<small className={`text-xs font-normal text-red-500`}>{errorFormat(error)}</small>
				</div>
			)}
			<div
				className={`w-full relative h-fit  border rounded-md ${
					theme === "dark" ? "border-transparent-100" : "border-gray-800"
				}`}
			>
				<div className="w-full relative h-fit">
					<CommonButton
						children={
							<div className="flex items-center space-x-4">
								{ContactIcon}
								<p>Use testing account</p>
							</div>
						}
						type="button"
						hasUniqueColor={`${theme === "dark" ? "bg-blue-800 " : "bg-white-700 "}`}
						extraClass={`border-none w-full h-10 px-4 text-xs font-semi-bold ${
							theme === "dark" ? "text-white-800" : "text-black-600"
						}`}
						onClickHandler={() =>
							handleTestAccountAuth({
								email: "test@example.com",
								password: "test123",
							})
						}
					/>
					{isLoading && (
						<SubmittingSpinner
							colors={`${
								theme === "dark" ? "bg-blue-800 text-white-800" : "bg-white-700 text-black-600"
							}`}
							size="w-7 h-7"
						/>
					)}
				</div>
			</div>
		</>
	);
};
