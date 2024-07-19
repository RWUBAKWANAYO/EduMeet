import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { ActivityCard } from "../shared/cards/ActivityCard";
import { useCountInvitations } from "../invitations/useInvitations";
import { MessageDisplay } from "../shared/MessageDisplay";
import { useCountMeetingMessages } from "./useHome";
import { IStatsCountResponse } from "./types";
import { IMeetingCountResponse } from "../meetings/types";
import { errorFormat } from "../../utils";

interface IActivitiesCountProps {
	statsLoading: boolean;
	statsData?: IStatsCountResponse;
	meetingsLoading: boolean;
	meetingsData?: IMeetingCountResponse;
}
export const ActivitiesCount: React.FC<IActivitiesCountProps> = ({
	statsLoading,
	statsData = {},
	meetingsLoading,
	meetingsData = {},
}) => {
	const { theme } = useContext(UIContext);
	const { isLoading: invitationsLoading, data: invitationsData } = useCountInvitations();
	const { isLoading: messagesLoading, data: messagesData } = useCountMeetingMessages();

	return (
		<div
			className={`p-4 w-full rounded-lg border ${
				theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
			}`}
		>
			<h3
				className={`mb-4 text-xs font-medium ${
					theme === "dark" ? "text-transparent-300" : "text-black-400"
				}`}
			>
				Activities stats
			</h3>
			{invitationsLoading && meetingsLoading && messagesLoading && statsLoading ? (
				<MessageDisplay height="h-44" />
			) : (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-2">
					{invitationsData?.data && (
						<>
							<ActivityCard title="Invitations Sent" count={invitationsData.data.sent} />
							<ActivityCard title="Invitate Receved" count={invitationsData.data.received} />
							<ActivityCard
								title="Pending invitation you sent"
								count={invitationsData.data.sentPending}
							/>
							<ActivityCard
								title="Accepted invitation you sent"
								count={invitationsData.data.sentAccepted}
							/>
							<ActivityCard
								title="Pending invitation you received"
								count={invitationsData.data.ReceivedPending}
							/>
							<ActivityCard
								title="Accepted invitation you received"
								count={invitationsData.data.ReceivedAccepted}
							/>
						</>
					)}
					{meetingsData?.data && (
						<ActivityCard title="Total Hosted Meetings" count={meetingsData.data.hosted} />
					)}
					{statsData?.data && (
						<ActivityCard title="Recorded Meetings" count={statsData.data.recordings} />
					)}
					{messagesData?.data && (
						<ActivityCard title="Total Message send" count={messagesData.data.total} />
					)}
				</div>
			)}
		</div>
	);
};
