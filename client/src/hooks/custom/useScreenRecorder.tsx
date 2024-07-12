import { useEffect, useState, useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import moment from "moment";
import { UIContext } from "../context/UIContext";

export const useScreenRecorder = () => {
  const { isDesktop } = useContext(UIContext);

  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (startTime) {
      timer = setInterval(() => {
        const now = moment();
        const duration = moment.duration(now.diff(startTime));
        const formattedTime = `${String(duration.hours()).padStart(2, "0")}:${String(
          duration.minutes()
        ).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;
        setElapsedTime(formattedTime);
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTime]);

  if (!isDesktop()) {
    return {
      startRecording: () => {},
      stopRecording: () => {},
      elapsedTime: "00:00:00",
      startTime: null,
    };
  }

  const handleStopRecording = (blobUrl: string) => {
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `nayomeet-recording-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { startRecording, stopRecording } = useReactMediaRecorder({
    screen: true,
    onStart: () => {
      setStartTime(moment());
    },
    onStop: (blobUrl) => {
      setStartTime(null);
      handleStopRecording(blobUrl);
    },
  });

  return {
    elapsedTime,
    startTime,
    startRecording,
    stopRecording,
  };
};
