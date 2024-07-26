import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AxiosInstance from "../../lib/axiosInstance";
import { ICreateMeetingRoomResponse } from "../../types/meetings.interface";
import { useParams } from "react-router-dom";
import { UserContext } from "../../hooks/context/UserContext";
import { MeetingRoomContext } from "../../hooks/context/meetings/MeetingRoomContext";
import { IMeetingRoomData } from "./types";
import { MeetingChatContext } from "../../hooks/context/meetings/MeetingChatContext";

// create meeting room
const CreateMeetingRoom = async (data: IMeetingRoomData) => {
	const response = await AxiosInstance({
		url: `/meeting-rooms`,
		method: "POST",
		data,
	});
	return response.data;
};

export const useCreateMeetingRoom = (
	onSuccessCallback: (data: ICreateMeetingRoomResponse) => void
) => {
	const queryClient = useQueryClient();

	return useMutation<ICreateMeetingRoomResponse, Error, IMeetingRoomData>(
		(data: IMeetingRoomData) => CreateMeetingRoom(data),
		{
			onSuccess: (data: ICreateMeetingRoomResponse) => {
				queryClient.invalidateQueries("meetingRooms");
				onSuccessCallback(data);
			},
		}
	);
};
// join meeting room
const joinMeetingRoom = async (roomId: string, token: string) => {
	const response = await AxiosInstance({
		url: `/meeting-rooms/join/${roomId}`,
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const useJoinMeetingRoomCall = (roomId: string) => {
	const { token } = useContext(UserContext);
	const { handleMeetingRoom } = useContext(MeetingRoomContext);
	const { fetchMeetingChat } = useContext(MeetingChatContext);
	return useQuery<ICreateMeetingRoomResponse, Error>(
		["meetingRooms", roomId, token],
		() => joinMeetingRoom(roomId, token!),
		{
			onSuccess: (data) => {
				if (!data || !data.data) return;
				handleMeetingRoom(data.data);
				return fetchMeetingChat({ chatType: "group", roomId: data.data._id });
			},
			enabled: !!roomId && !!token,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);
};

export const useMeetingRoom = () => {
	const [enlargeChatSize, setEnlargeChatSize] = useState(false);
	const [enlargeParticipantsSize, setEnlargeParticipantsSize] = useState(false);
	const chatSizeHandler = () => setEnlargeChatSize(!enlargeChatSize);
	const participantsSizeHandler = () => setEnlargeParticipantsSize(!enlargeParticipantsSize);

	const { roomId } = useParams();
	const { setMeetingRoomId } = useContext(MeetingRoomContext);

	useEffect(() => {
		setMeetingRoomId(roomId || "");
	}, [roomId, setMeetingRoomId]);

	const { data, isLoading, error } = useJoinMeetingRoomCall(roomId || "");

	return {
		chatSizeHandler,
		participantsSizeHandler,
		enlargeChatSize,
		enlargeParticipantsSize,
		isLoading,
		error,
	};
};
