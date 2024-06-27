import { IUser } from "./users.interface";

export interface IMessage {
  _id?: string;
  user: IUser;
  content: string;
  timestamp: Date;
}
