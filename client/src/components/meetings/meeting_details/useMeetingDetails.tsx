import { useContext } from "react";
import { UserContext } from "../../../hooks/context/UserContext";
import { useCreateInvitation, usePeopleToInvite } from "../../../hooks/custom";
import { MeetingsContext } from "../../../hooks/context/meetings/MeetingsContext";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../../types/users.interface";
import { useNavigate } from "react-router-dom";
import { useMeetings } from "../useMeetings";

export const useMeetingDetails = () => {
  const { user } = useContext(UserContext);
  const { selectedMeeting: meeting } = useContext(MeetingsContext);
  const navigate = useNavigate();
  const { clickHandler } = useMeetings();

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

  const { data, error, isLoading } = usePeopleToInvite(meeting?._id);
  const peopleToInvite = data?.data?.filter((member: IUser) => member._id !== user?._id) || [];

  const { mutate: createInvitation } = useCreateInvitation();

  const inviteHandler = (receivers: IUser[]) => {
    createInvitation({
      receivers: receivers,
      invitation_type: "meeting",
      meeting_id: meeting._id,
      sender_id: user?._id || "",
    });
  };
  const navigateToanalytics = () => navigate(`/meetings/${meeting._id}/analytics`);
  const joinMeetingHandler = () =>
    clickHandler({
      meetingType: "scheduled",
      meeting,
    });

  return {
    meetingControls,
    data: peopleToInvite,
    error,
    isLoading,
    inviteHandler,
    navigateToanalytics,
    joinMeetingHandler,
  };
};
