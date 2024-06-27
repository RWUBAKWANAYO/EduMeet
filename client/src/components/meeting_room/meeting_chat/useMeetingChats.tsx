import { useState } from "react";
import { users } from "../../../mock_data/users";

export const useMeetingChats = (participantsSizeHandler: () => void) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const expandHandler = () => {
    setExpanded(!expanded);
    participantsSizeHandler();
  };

  return {
    expanded,
    expandHandler,
    peersList: users,
  };
};
