import { useContext, useEffect, useState } from "react";
import { useFetchMeetings } from "../meetings/useMeetings";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../../hooks/context/UserContext";
import { useQuery } from "react-query";
import { IMessageCountResponse, IStatsCountResponse } from "./types";
import { useMeetings as joinnMeetingHandler } from "../meetings/useMeetings";
import { IMeetingData } from "../../types/meetings.interface";
import { IInvitaion } from "../../types/invitations.interface";

// count meeting room messages
const countMeetingMessages = async (token: string) => {
	const response = await AxiosInstance({
		url: `/meeting-messages/count`,
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const useCountMeetingMessages = () => {
	const { token } = useContext(UserContext);

	return useQuery<IMessageCountResponse, Error>(
		["countMeetingMessages", token],
		() => countMeetingMessages(token!),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
};

// count meeting stats
const countMeetingStats = async (token: string) => {
	const response = await AxiosInstance({
		url: `/meeting-stats/count`,
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const useCountMeetingStats = () => {
	const { token } = useContext(UserContext);

	return useQuery<IStatsCountResponse, Error>(
		["countMeetingStats", token],
		() => countMeetingStats(token!),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
};

export const useMeetings = () => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	const { clickHandler } = joinnMeetingHandler();
	const { refetch } = useFetchMeetings({ startDate: selectedDate });
	useEffect(() => {
		refetch();
	}, [selectedDate]);
	const selectDateHandler = (date: Date) => setSelectedDate(date);
	const joinMeetingHandler = (meeting: IMeetingData) => {
		return clickHandler({
			meetingType: "scheduled",
			meeting,
		});
	};
	return {
		selectedDate,
		selectDateHandler,
		joinMeetingHandler,
	};
};

export const useInvitations = () => {
	const getPendingInvite = (inviteData: IInvitaion[]) => {
		return inviteData.filter((invite) => invite.meeting_id && invite.meeting_id.status !== "ended");
	};

	return {
		getPendingInvite,
	};
};
