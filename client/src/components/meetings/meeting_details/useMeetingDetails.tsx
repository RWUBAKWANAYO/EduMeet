import { useContext } from "react";
import { MeetingsContext } from "../../../hooks/context/MeetingsContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const useMeetingDetails = (meetingId: string) => {
  const navigate = useNavigate();
  const { selectedMeeting: meeting } = useContext(MeetingsContext);

  const meetingControls = () => [
    {
      _id: uuidv4(),
      title: "Has Waitingroom",
      status: meeting?.waiting_room,
    },
    { _id: uuidv4(), title: "Require Host Confirmation", status: meeting?.require_confirm },

    { _id: uuidv4(), title: "Is Host Video On", status: meeting?.video?.host === "on" },
    {
      _id: uuidv4(),
      title: "Is Participants Video On",
      status: meeting?.video?.participants === "on",
    },
    {
      _id: uuidv4(),
      title: `Require Passcode ${meeting.passcode_required ? `: ${meeting.passcode}` : ""}`,
      status: meeting?.passcode_required,
    },
  ];

  const navigateToanalytics = () => navigate(`/meetings/${meetingId}/analytics`);

  return {
    meetingControls,
    navigateToanalytics,
  };
};
