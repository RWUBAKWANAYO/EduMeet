import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../../hooks/context/UserContext";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IFilterStatsData, IFilterStatsResponse, IStat } from "./types";

// filter meeting stats
const filterMeetingStats = async (token: string, data: IFilterStatsData) => {
	const response = await AxiosInstance({
		url: `/meeting-stats/filter?roomId=${data.roomId ?? ""}&meetingId=${data.meetingId ?? ""}`,
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const useFilterMeetingStats = (data: IFilterStatsData) => {
	const { token } = useContext(UserContext);

	return useQuery<IFilterStatsResponse, Error>(
		["meetingStats", token],
		() => filterMeetingStats(token!, data),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
};

export const useAnalytics = () => {
	const { meetingId } = useParams();
	const { isLoading, error, data, refetch } = useFilterMeetingStats({ meetingId });
	const [selectedStat, setSelectedStat] = useState<IStat>({} as IStat);
	useEffect(() => {
		if (data && data.data.length > 0) {
			setSelectedStat(data.data[0]);
		}
	}, [data]);
	useEffect(() => {
		refetch();
	}, [meetingId]);
	const selectStatHandler = (stat: IStat) => setSelectedStat(stat);

	return { isLoading, refetch, error, data, selectedStat, selectStatHandler };
};
