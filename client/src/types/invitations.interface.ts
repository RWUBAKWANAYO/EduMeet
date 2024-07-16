import { IMeetingData } from "./meetings.interface";
import { IUser } from "./users.interface";

export interface IInvitaion extends Document {
	_id?: string;
	meeting_id: IMeetingData;
	message?: string;
	sender_id: IUser;
	receiver_email: string;
	receiver_id?: IUser;
	status: "accepted" | "pending";
}
