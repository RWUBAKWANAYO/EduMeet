import { IUser } from "./users.interface";

export interface IMeetingData {
	_id?: string;
	title?: string;
	description?: string;
	session_id?: number | string;
	status?: string;
	start_time?: Date | string;
	end_time?: Date | string;
	isInstant?: boolean;
	host?: IUser | string;
	passcode_required?: boolean;
	waiting_room?: boolean;
	require_confirm?: boolean;
	passcode?: string;
	participants?: IUser[];
	video?: {
		host: string;
		participants: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IMeetingsResponse {
	count: number;
	data: IMeetingData[];
	status: string;
	isLoading: boolean;
	error: null | Error;
}

export interface IMeetingRoom {
	_id?: string;
	meeting_type: "instant" | "scheduled";
	session_id: number | string;
	attendees: IUser[];
	meeting?: IMeetingData;
}

export interface ICreateMeetingRoomResponse {
	data?: IMeetingRoom;
	status?: string;
	waiting_room?: boolean;
	require_confirm?: boolean;
	meeting?: IMeetingData;
	join_request_rejected?: boolean;
}
