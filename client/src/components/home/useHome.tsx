import { useState } from "react";

export const useMeetings = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const selectDateHandler = (date: Date) => setSelectedDate(date);

  return {
    selectedDate,
    selectDateHandler,
  };
};
