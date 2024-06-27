import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useMeetingsFilters = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("upcoming");

  const navigateHandler = () => navigate("/meetings/new");
  const refreshHandler = () => {};

  const upcomingHandler = () => {
    setStatus("upcoming");
  };
  const endedHandler = () => {
    setStatus("ended");
  };
  const ongoingHandler = () => {
    setStatus("ongoing");
  };

  return {
    status,
    navigateHandler,
    refreshHandler,
    upcomingHandler,
    endedHandler,
    ongoingHandler,
  };
};
