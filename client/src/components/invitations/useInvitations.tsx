import { useContext, useState } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import { UserContext } from "../../hooks/context/UserContext";
import { UIContext } from "../../hooks/context/UIContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IUser } from "../../types/users.interface";
import { IInvitaion } from "../../types/invitations.interface";

export interface IInvitationData {
	receivers: IUser[];
	invitation_type: "meeting" | "chat";
	meeting_id: string;
	sender_id: string;
}

export interface IFilterInvitationData {
	status?: "accepted" | "pending";
	role?: "sender" | "receiver" | null;
	meeting_id?: string;
}

export interface IInvitationResponse {
	status: string;
	data: IInvitaion[];
}

const createInvitation = async (token: string, data: IInvitationData) => {
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

const filterInvitation = async (token: string, data: IFilterInvitationData) => {
	const response = await AxiosInstance({
		url: `/invitations/filter?meeting_id=${data.meeting_id ?? ""}&role=${data.role ?? ""}&status=${
			data.status ?? ""
		}`,
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
		data: data,
	});

	return response.data;
};
export const useFilterInvitations = (data: IFilterInvitationData) => {
	const { token } = useContext(UserContext);

	return useQuery<IInvitationResponse, Error>(
		["meetingInvitations", data],
		() => filterInvitation(token!, data),
		{ enabled: !!data, keepPreviousData: true, refetchOnWindowFocus: false }
	);
};

const confirmInvitation = async (token: string, invitationId: string) => {
	const response = await AxiosInstance({
		url: `/invitations/confirm/${invitationId}`,
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const useConfirmInvitation = () => {
	const { token } = useContext(UserContext);
	const queryClient = useQueryClient();
	return useMutation((invitationId: string) => confirmInvitation(token!, invitationId), {
		onSuccess: () => {
			queryClient.invalidateQueries("meetingInvitations");
		},
	});
};

export const useInvitations = () => {
	const [filter, setFilter] = useState<"sender" | "receiver" | "all">("all");
	const { isLoading, error, data, refetch } = useFilterInvitations({
		role: filter !== "all" ? filter : null,
	});

	const filterChangeHandler = (filter: "sender" | "receiver" | "all") => {
		setFilter(filter);
		console.log("clicked..", filter);
		refetch();
	};

	return {
		isLoading,
		error,
		data,
		filter,
		filterChangeHandler,
	};
};
