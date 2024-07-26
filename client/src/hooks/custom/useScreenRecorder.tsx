import { useEffect, useState, useContext, useRef } from "react";
import moment from "moment";
import { MeetingRoomContext } from "../context/meetings/MeetingRoomContext";

export const useScreenRecorder = () => {
	const { screenRecordingHandler } = useContext(MeetingRoomContext);
	const [startTime, setStartTime] = useState<moment.Moment | null>(null);
	const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const chunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
			const recorder = new MediaRecorder(stream);
			setMediaRecorder(recorder);

			recorder.onstart = () => {
				setStartTime(moment());
				screenRecordingHandler("start_recording");
			};

			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunks.current.push(event.data);
				}
			};

			recorder.onstop = () => {
				const blob = new Blob(chunks.current, { type: "video/mp4" });
				const blobUrl = URL.createObjectURL(blob);
				setStartTime(null);
				screenRecordingHandler("stop_recording");
				handleStopRecording(blobUrl);
				chunks.current = [];
			};

			recorder.start();
		} catch (error) {
			console.error("Error starting screen recording:", error);
			// Handle error gracefully, e.g., show an error message to the user
		}
	};

	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") {
			mediaRecorder.stop();
		}
	};

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

	const handleStopRecording = (blobUrl: string) => {
		const link = document.createElement("a");
		link.href = blobUrl;
		link.download = `nayomeet-recording-${Date.now()}.mp4`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return {
		elapsedTime,
		startTime,
		startRecording,
		stopRecording,
	};
};
