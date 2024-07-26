import React, { useContext } from "react";
import { useCustomClipboard } from "../../../hooks/custom/useCustomClipboard";
import { CommonButton } from "./CommonButton";
import { UIContext } from "../../../hooks/context/UIContext";

interface ICommonClipBoard {
	inputData: number | string;
	displayData: string;
	tostData: string;
	extraClass?: string;
	hasUniqueColor?: string;
}
export const CommonClipboard: React.FC<ICommonClipBoard> = ({
	inputData,
	displayData,
	tostData,
	extraClass = "w-8",
	hasUniqueColor,
}) => {
	const { theme } = useContext(UIContext);
	const { clipboard, copyToast, onHoverHandler, onCopyHandler } = useCustomClipboard();
	return (
		<CommonButton
			children={
				<>
					<div className="w-full h-full flex items-center justify-center">{displayData}</div>
					<input
						ref={clipboard.target}
						className=" text-xs bg-transparent-0 absolute top-0 left-0 w-8 invisible"
						type="text"
						readOnly
						value={inputData}
					/>
					<div
						className="w-full h-full absolute top-0 left-0 z-10"
						onMouseOver={() => onHoverHandler(true)}
						onMouseLeave={() => onHoverHandler(false)}
						onClick={onCopyHandler}
					>
						{copyToast.visible && (
							<label
								className={`absolute top-10 w-20 p-2 right-0 rounded shadow ${
									theme === "dark"
										? "bg-blue-800 text-white-800 shadow-transparent-50"
										: "bg-white-100 text-black-600 "
								}`}
							>
								{copyToast.copied ? `${tostData} Copied` : `Copy ${tostData}`}
							</label>
						)}
					</div>
				</>
			}
			type="button"
			hasUniqueColor={hasUniqueColor}
			extraClass={`relative h-8 text-xs font-semi-bold ${extraClass}`}
		/>
	);
};
