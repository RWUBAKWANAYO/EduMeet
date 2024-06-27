import { FormEvent, useRef, useState } from "react";
import { generateCode } from "../../utils";

export const useNewMeeting = () => {
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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
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
