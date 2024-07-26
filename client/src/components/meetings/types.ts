import { IMeetingData } from "../../types/meetings.interface";

export interface IMeetingsResponse {
	count: number;
	data: IMeetingData[];
	status: string;
}

export interface IMeetingsData {
	status?: string;
	startDate?: Date;
}

export interface IMeetingCountResponse {
	status: string;
	data: {
		hosted: number;
		upcoming: number;
		ongoing: number;
		ended: number;
		total: number;
	};
}
