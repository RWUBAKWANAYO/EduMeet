import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../hooks/context/UserContext";
import { useCreateMeetingRoom } from "../meeting_room/useMeetingRoom";
import { v4 as uuidv4 } from "uuid";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { ICreateMeetingRoomResponse } from "../../types/meetings.interface";
import { useParams } from "react-router-dom";

interface IjoinMeetingName {
	value: string;
	input: boolean;
}

export const useJoinMeetingForm = () => {
	const { setAccessRoom } = useContext(MeetingsContext);
	const { user } = useContext(UserContext);
	const [name, setName] = useState<IjoinMeetingName>({
		value: user?.full_name ? user.full_name : "",
		input: user?.full_name ? true : false,
	});

	const meetingIdRef = useRef<HTMLInputElement>(null);
	const passcodeRef = useRef<HTMLInputElement>(null);

	const { sessionId } = useParams();

	useEffect(() => {
		if (sessionId) onSubmitHandler(sessionId);
	}, [sessionId]);

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName({ ...name, value: e.target.value });
	};

	const useCreateCallback = (res: ICreateMeetingRoomResponse) => {
		setAccessRoom(res);
	};
	const { mutate: createMeetingRoom, isLoading, error } = useCreateMeetingRoom(useCreateCallback);

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement> | string) => {
		if (typeof e !== "string") {
			e.preventDefault();
			if (!meetingIdRef.current?.value) return alert("Please fill all the fields");

			createMeetingRoom({
				meetingType: "scheduled",
				sessionId: parseInt(meetingIdRef.current?.value!),
				passcode: passcodeRef.current?.value,
				userId: user?._id ? user._id : "",
			});
		} else {
			createMeetingRoom({
				meetingType: "scheduled",
				sessionId: parseInt(e),
				passcode: passcodeRef.current?.value,
				userId: user?._id ? user._id : "",
			});
		}
	};

	return {
		name,
		nameHandler,
		meetingIdRef,
		passcodeRef,
		onSubmitHandler,
		isLoading,
		error,
	};
};
