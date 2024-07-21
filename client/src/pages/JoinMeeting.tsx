import React, { useContext } from "react";
import { JoinMeetingForm } from "../components/join_meeting/JoinMeetingForm";
import { ThemeButton } from "../components/shared/buttons";
import { UIContext } from "../hooks/context/UIContext";
import { withJoinMeetingConditions } from "../components/JoinMeetingConditions";

const JoinMeeting: React.FC = () => {
	const { theme } = useContext(UIContext);

	return (
		<div
			className={`w-full min-h-screen p-8 sm:p-0 pb-20 sm:pb-0 flex flex-col sm:flex-row sm:justify-center items-center relative ${
				theme === "dark" ? "bg-blue-800" : "bg-white-700"
			}`}
		>
			<JoinMeetingForm />
			<div className="absolute bottom-4 left-4">
				<ThemeButton />
			</div>
		</div>
	);
};

export default withJoinMeetingConditions(JoinMeeting);
