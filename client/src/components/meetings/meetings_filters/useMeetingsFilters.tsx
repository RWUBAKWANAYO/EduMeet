import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMeetings } from "../useMeetings";

export const useMeetingsFilters = () => {
	const navigate = useNavigate();
	const [status, setStatus] = useState<string>("upcoming");
	const { refetch } = useFetchMeetings({ status });

	const navigateHandler = () => navigate("/meetings/new");
	const refreshHandler = () => refetch();

	const upcomingHandler = () => {
		setStatus("upcoming");
		refetch();
	};
	const endedHandler = () => {
		setStatus("ended");
		refetch();
	};
	const ongoingHandler = () => {
		setStatus("ongoing");
		refetch();
	};

	return {
		status,
		navigateHandler,
		refreshHandler,
		upcomingHandler,
		endedHandler,
		ongoingHandler,
	};
};
