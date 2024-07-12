import { useContext } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { IUser } from "../../types/users.interface";

export interface IPeopleToInviteResponse {
  count: number;
  data: IUser[];
  status: string;
}

const fetchPeopleToInvite = async (token: string, meetingId: string) => {
  const response = await AxiosInstance({
    url: `/users/with-invitation-status/${meetingId}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const usePeopleToInvite = (meetingId: string) => {
  const { token } = useContext(UserContext);

  return useQuery<IPeopleToInviteResponse, Error>(
    ["peopleToInvite", meetingId],
    () => fetchPeopleToInvite(token!, meetingId),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

const fetchUsers = async (token: string) => {
  const response = await AxiosInstance({
    url: `/users`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const useFetchUsers = () => {
  const { token } = useContext(UserContext);

  return useQuery<IPeopleToInviteResponse, Error>(["users"], () => fetchUsers(token!), {
    refetchOnWindowFocus: false,
  });
};
