import { useEffect, useState } from "react";
import moment, { Moment } from "moment";

export const useCurrentTime = (): Moment => {
  const [currentTime, setCurrentTime] = useState<Moment>(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return currentTime;
};
