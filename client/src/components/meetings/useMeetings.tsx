import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../../hooks/context/UserContext";
import { MeetingsContext } from "../../hooks/context/meetings/MeetingsContext";
import { UIContext } from "../../hooks/context/UIContext";
import { IUser } from "../../types/users.interface";
import { ICreateMeetingRoomResponse, IMeetingData } from "../../types/meetings.interface";
import { useCreateMeetingRoom } from "../meeting_room/useMeetingRoom";

export interface IMeetingsResponse {
  count: number;
  data: IMeetingData[];
  status: string;
}

// fetch meetings
const fetchMeetings = async (token: string, status: string) => {
  const response = await AxiosInstance({
    url: `/meetings/user/filter?status=${status}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useFetchMeetings = (status: string) => {
  const { token } = useContext(UserContext);
  const { updateMeetings } = useContext(MeetingsContext);

  return useQuery<IMeetingsResponse, Error>(
    ["meetings", token, status],
    () => fetchMeetings(token!, status),
    {
      onSuccess: (data) => {
        return updateMeetings(data);
      },
      enabled: !!status,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

// delete meeting
const deleteMeeting = async (token: string, id: string) => {
  const response = await AxiosInstance({
    url: `/meetings/${id}`,
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useDeleteMeeting = () => {
  const { token } = useContext(UserContext);
  const { closeModal } = useContext(UIContext);
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteMeeting(token!, id), {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
      return closeModal();
    },
  });
};

// edit meeting

const editMeeting = async (token: string, data: IMeetingData) => {
  const response = await AxiosInstance({
    url: `/meetings/${data._id}`,
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response.data;
};

export const useEditMeeting = () => {
  const { token } = useContext(UserContext);
  const { closeModal } = useContext(UIContext);
  const queryClient = useQueryClient();

  return useMutation((data: IMeetingData) => editMeeting(token!, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
      return closeModal();
    },
  });
};

export const useMeetings = () => {
  const { user } = useContext(UserContext);
  const { setAccessRoom } = useContext(MeetingsContext);
  const allParticipants = (participansts: IUser[]) => [
    {
      _id: user?._id,
      full_name: user?.full_name,
      photo: user?.photo,
    },
    ...participansts,
  ];

  const useCreateCallback = (res: ICreateMeetingRoomResponse) => setAccessRoom(res);
  const { mutate: createMeetingRoom } = useCreateMeetingRoom(useCreateCallback);

  const clickHandler = ({
    meetingType,
    meeting,
  }: {
    meetingType: "instant" | "scheduled";
    meeting?: IMeetingsResponse["data"][0];
  }) => {
    const data = {
      meetingType,
      userId: user?._id ? user._id : "",
    };
    if (meetingType === "instant") {
      if (!user?.pmi) return;
      return createMeetingRoom({ ...data, sessionId: user?.pmi });
    } else {
      if (!meeting || !meeting.session_id) return;
      createMeetingRoom({
        ...data,
        sessionId: +meeting.session_id,
        passcode: meeting?.passcode,
      });
    }
  };

  return { allParticipants, clickHandler };
};
