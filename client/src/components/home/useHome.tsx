import { useContext, useState } from "react";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { IMeetingData } from "../../types/meetings.interface";

export const useMeetings = () => {
  const { meetings } = useContext(MeetingsContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [meetingsData, setMeetingsData] = useState<IMeetingData[] | []>(meetings.data.slice(0, 5));

  const selectDateHandler = (date: Date) => setSelectedDate(date);

  return {
    selectedDate,
    selectDateHandler,
    meetingsData,
  };
};
