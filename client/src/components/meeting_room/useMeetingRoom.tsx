import { useState } from "react";

export const useMeetingRoom = () => {
  const [enlargeChatSize, setEnlargeChatSize] = useState(false);
  const [enlargeParticipantsSize, setEnlargeParticipantsSize] = useState(false);
  const chatSizeHandler = () => setEnlargeChatSize(!enlargeChatSize);
  const participantsSizeHandler = () => setEnlargeParticipantsSize(!enlargeParticipantsSize);

  return {
    chatSizeHandler,
    participantsSizeHandler,
    enlargeChatSize,
    enlargeParticipantsSize,
  };
};
