export interface IMessageCountResponse {
	status: string;
	data: {
		total: number;
	};
}

export interface IStatsCountResponse {
	status: string;
	data: {
		attended: number;
		missed: number;
		recordings: number;
	};
}
