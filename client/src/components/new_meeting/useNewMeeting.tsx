import { FormEvent, useContext, useRef, useState } from "react";
import { generateCode, timeFormatter, timeValidator } from "../../utils";
import { UserContext } from "../../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../lib/axiosInstance";
import { IMeetingData } from "../../types/meetings.interface";
import { useMutation, useQueryClient } from "react-query";

const createMeetingRequest = async (token: string, data: IMeetingData) => {
  const response = await AxiosInstance({
    url: `/meetings/`,
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response.data;
};

export const useCreateMeeting = (onSuccessCallback: () => void) => {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();

  return useMutation((data: IMeetingData) => createMeetingRequest(token!, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
      onSuccessCallback();
    },
  });
};

export const useNewMeeting = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeFrom, setSelectedTimeFrom] = useState<Date | null>(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState<Date | null>(new Date());
  const [isWatingRoom, setIsWaitingRoom] = useState<boolean>(true);
  const [passcodeRequired, setPasscodeRequired] = useState<Record<string, any>>({
    status: false,
    value: generateCode(),
  });
  const [requireConfirm, setRequireConfirm] = useState<boolean>(false);
  const [hostVideo, setHostVideo] = useState<"on" | "off">("on");
  const [participantVideo, setParticipantVideo] = useState<"on" | "off">("on");

  const selectDateHandler = (date: Date) => setSelectedDate(date);

  const selectTimeFromHandler = (time: Date) => setSelectedTimeFrom(time);
  const selectTimeToHandler = (time: Date) => setSelectedTimeTo(time);

  const waitingRoomHandler = () => setIsWaitingRoom(!isWatingRoom);

  const passcodeHandler = () => {
    setPasscodeRequired({ ...passcodeRequired, status: !passcodeRequired.status });
  };

  const requireConfirmHandler = () => {
    if (!requireConfirm === true) setIsWaitingRoom(false);
    setRequireConfirm(!requireConfirm);
  };
  const hostVideoHandler = () => setHostVideo(hostVideo === "on" ? "off" : "on");
  const participantVideoHandler = () => {
    setParticipantVideo(participantVideo === "on" ? "off" : "on");
  };

  const onSuccessCallback = () => navigate(-1);
  const { mutate } = useCreateMeeting(onSuccessCallback);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!titleRef.current || !descRef.current || !user) return;

    const { start_time, end_time } = timeFormatter(
      selectedDate!,
      selectedTimeFrom!,
      selectedTimeTo!
    );
    const validateError = timeValidator(start_time, end_time);
    if (validateError) {
      return alert(validateError);
    }

    mutate({
      title: titleRef.current.value,
      description: descRef.current.value,
      start_time,
      end_time,
      isInstant: false,
      host: user._id || "",
      waiting_room: isWatingRoom,
      passcode_required: passcodeRequired.status,
      passcode: passcodeRequired.status ? passcodeRequired.value : null,
      require_confirm: requireConfirm,
      video: {
        host: hostVideo,
        participants: participantVideo,
      },
    });
  };

  return {
    titleRef,
    descRef,
    selectedDate,
    selectDateHandler,
    selectedTimeFrom,
    selectedTimeTo,
    selectTimeFromHandler,
    selectTimeToHandler,
    submitHandler,
    isWatingRoom,
    setIsWaitingRoom,
    passcodeRequired,
    passcodeHandler,
    waitingRoomHandler,
    requireConfirm,
    requireConfirmHandler,
    hostVideo,
    hostVideoHandler,
    participantVideo,
    participantVideoHandler,
  };
};
