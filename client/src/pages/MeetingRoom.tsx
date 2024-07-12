import { useContext } from "react";
import { Navbar } from "../components/shared/Navbar";
import { UIContext } from "../hooks/context/UIContext";
import {
  MessageComposer,
  MeetingChats,
  Participants,
  SelfStream,
  Preferences,
  PeersStream,
  HeadLine,
} from "../components/meeting_room";
import { useMeetingRoom } from "../components/meeting_room/useMeetingRoom";
import { useScreenRecorder } from "../hooks/custom";

export const MeetingRoom = () => {
  const { theme } = useContext(UIContext);
  const { chatSizeHandler, participantsSizeHandler, enlargeChatSize, enlargeParticipantsSize } =
    useMeetingRoom();
  const { startTime, elapsedTime, startRecording, stopRecording } = useScreenRecorder();

  return (
    <div
      className={`relative w-full h-screen ${theme === "dark" ? "bg-blue-700" : "bg-white-700"}`}
    >
      <div
        className={`w-full sticky top-0 z-50 h-[60px] border-b ${
          theme === "dark" ? "bg-blue-800  border-blue-600" : "bg-white-100  border-gray-800"
        }`}
      >
        <Navbar meetingHeadLine={<HeadLine />} />
      </div>

      <div className={` flex w-full`} style={{ height: "calc(100% - 60px)" }}>
        <div className=" grow h-full">
          <div
            className="w-full flex flex-col px-6 pt-4 pb-1 space-y-4 stream-container"
            style={{ height: "calc(100vh - 130px)" }}
          >
            <SelfStream startTime={startTime} elapsedTime={elapsedTime} />
            <PeersStream />
          </div>
          <Preferences
            startTime={startTime}
            elapsedTime={elapsedTime}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </div>
        <div
          className={` w-[300px] h-full border-l flex flex-col justify-start ${
            theme === "dark" ? "bg-blue-800 border-blue-600" : "bg-white-100 border-gray-800"
          }`}
        >
          <Participants
            chatSizeHandler={chatSizeHandler}
            enlargeParticipantsSize={enlargeParticipantsSize}
          />
          <MeetingChats
            enlargeChatSize={enlargeChatSize}
            participantsSizeHandler={participantsSizeHandler}
          />
          <MessageComposer />
        </div>
      </div>
    </div>
  );
};
