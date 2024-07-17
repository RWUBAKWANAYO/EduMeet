import { useContext, useEffect, useState } from "react";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { useFetchMeetings } from "../meetings/useMeetings";

export const useMeetings = () => {
	const { meetings } = useContext(MeetingsContext);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

	const { refetch } = useFetchMeetings({ startDate: selectedDate });
	useEffect(() => {
		refetch();
	}, [selectedDate]);
	const selectDateHandler = (date: Date) => setSelectedDate(date);

	return {
		selectedDate,
		selectDateHandler,
		meetingsData: meetings.data.slice(0, 5),
	};
};
