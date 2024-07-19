import { IMeetingData, IMeetingRoom } from "../../types/meetings.interface";
import { IUser } from "../../types/users.interface";

export interface IStat {
	_id: string;
	room: IMeetingRoom;
	meeting: IMeetingData;
	user: IUser;
	presence: boolean;
	attendances: {
		start_time?: Date;
		end_time?: Date;
	}[];
	recordings: {
		start_time?: Date;
		end_time?: Date;
	}[];
	audio_muted: {
		start_time?: Date;
		end_time?: Date;
	}[];
	video_muted: {
		start_time?: Date;
		end_time?: Date;
	}[];
	screen_sharing: {
		start_time?: Date;
		end_time?: Date;
	}[];
}
export interface IFilterStatsResponse {
	status: string;
	data: IStat[];
}

export interface IFilterStatsData {
	roomId?: string;
	meetingId?: string;
	userRole?: string;
}
