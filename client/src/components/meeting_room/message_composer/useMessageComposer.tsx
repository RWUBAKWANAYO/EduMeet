import { useContext, useRef } from "react";
import { MeetingChatContext } from "../../../hooks/context/meetings/MeetingChatContext";

export const useMessageComposer = () => {
  const { sendMessage } = useContext(MeetingChatContext);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageRef.current) {
      sendMessage(messageRef.current.value);
      messageRef.current.value = "";
    }
  };
  return {
    messageRef,
    handleSubmit,
  };
};
