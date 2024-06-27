import { useRef } from "react";
export const useMessageComposer = () => {
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };
  return {
    messageRef,
    handleSubmit,
  };
};
