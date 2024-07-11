import { createContext, useState } from "react";
import { IMeetingData, IMeetingsResponse } from "../../../types/meetings.interface";

export const MeetingsContext = createContext<any>(null);

export const MeetingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [meetings, setMeetings] = useState<IMeetingsResponse>({
    count: 0,
    data: [],
    status: "",
  });
  const [selectedMeeting, setSelectedMeeting] = useState<IMeetingsResponse["data"][0] | null>(null);

  const updateMeetings = (data: IMeetingsResponse) => {
    setMeetings(data);
    setSelectedMeeting(data.data[0]);
  };

  const selectMeetingHandler = (meeting: IMeetingData) => {
    setSelectedMeeting(meeting);
  };

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        updateMeetings,
        selectedMeeting,
        selectMeetingHandler,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
