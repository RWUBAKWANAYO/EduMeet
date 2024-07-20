import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMeetings } from "../useMeetings";
import { MeetingsContext } from "../../../hooks/context/meetings/MeetingsContext";

export const useMeetingsFilters = () => {
	const navigate = useNavigate();
	const { setMeetingsLoadingError } = useContext(MeetingsContext);
	const [status, setStatus] = useState<string>("upcoming");
	const { refetch, isLoading, error } = useFetchMeetings({ status });

	useEffect(() => {
		setMeetingsLoadingError({
			isLoading,
			error,
		});
	}, [isLoading, error]);

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
