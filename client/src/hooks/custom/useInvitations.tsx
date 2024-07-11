import { useContext } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../context/UserContext";
import { UIContext } from "../context/UIContext";
import { useMutation, useQueryClient } from "react-query";
import { IUser } from "../../types/users.interface";

export interface IInvitationData {
  receivers: IUser[];
  invitation_type: "meeting" | "chat";
  meeting_id: string;
  sender_id: string;
}

export const createInvitation = async (token: string, data: IInvitationData) => {
  const response = await AxiosInstance({
    url: `/invitations/send`,
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });

  return response.data;
};

export const useCreateInvitation = () => {
  const { token } = useContext(UserContext);
  const { closeModal } = useContext(UIContext);
  const queryClient = useQueryClient();

  return useMutation((data: IInvitationData) => createInvitation(token!, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("meetingInvitations");
      queryClient.invalidateQueries("peopleToInvite");
      closeModal();
    },
  });
};
