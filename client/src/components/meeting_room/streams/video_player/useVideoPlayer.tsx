import { useEffect, useRef } from "react";

export const useVideoPlayer = (stream?: MediaStream) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return {
    videoRef,
  };
};
