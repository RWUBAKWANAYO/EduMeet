import { useState } from "react";
import { users } from "../../../mock_data/users";

export const useParticipants = (chatSizeHandler: () => void) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const expandHandler = () => {
    setExpanded(!expanded);
    chatSizeHandler();
  };

  return {
    expanded,
    expandHandler,
    attendees: users,
  };
};
