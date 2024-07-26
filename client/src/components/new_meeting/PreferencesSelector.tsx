import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { RadioButton } from "../shared/buttons";

interface IPreferencesSelector {
	requireConfirm: boolean;
	requireConfirmHandler: () => void;
	hostVideo: string;
	hostVideoHandler: () => void;
	participantVideo: string;
	participantVideoHandler: () => void;
}
export const PreferencesSelector: React.FC<IPreferencesSelector> = ({
	requireConfirm,
	requireConfirmHandler,
	hostVideo,
	hostVideoHandler,
	participantVideo,
	participantVideoHandler,
}) => {
	const { theme } = useContext(UIContext);

	return (
		<div className="w-full">
			<div
				className={`w-full pb-4 flex flex-col border-b ${
					theme === "dark" ? " border-transparent-400" : "border-gray-800 "
				}`}
			>
				<label
					className={`text-xs font-light my-4 ${
						theme === "dark" ? "text-transparent-300" : "text-black-400"
					}`}
				>
					Participants Entry Mode
				</label>
				<div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:justify-between">
					<RadioButton
						isActive={requireConfirm}
						onClickHandler={requireConfirmHandler}
						children="Join with host approval"
					/>
					<RadioButton
						isActive={!requireConfirm}
						onClickHandler={requireConfirmHandler}
						children="Join without confirmation"
					/>
				</div>
			</div>
			<div className={`w-full pb-4 flex flex-col `}>
				<label
					className={`text-xs font-light my-4 ${
						theme === "dark" ? "text-transparent-300" : "text-black-400"
					}`}
				>
					Video
				</label>
				<div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:justify-between">
					<div className="flex items-center space-x-2">
						<label className={`text-xs ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
							Host:
						</label>
						<RadioButton
							isActive={hostVideo === "on"}
							onClickHandler={hostVideoHandler}
							children="On"
						/>
						<RadioButton
							isActive={hostVideo === "off"}
							onClickHandler={hostVideoHandler}
							children="Off"
						/>
					</div>
					<div className="flex items-center space-x-2">
						<label className={`text-xs ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
							Participants:
						</label>
						<RadioButton
							isActive={participantVideo === "on"}
							onClickHandler={participantVideoHandler}
							children="On"
						/>
						<RadioButton
							isActive={participantVideo === "off"}
							onClickHandler={participantVideoHandler}
							children="Off"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
