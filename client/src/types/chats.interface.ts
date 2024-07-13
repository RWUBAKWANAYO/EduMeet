import { IUser } from "./users.interface";

export interface IMessage {
  _id?: string;
  chat?: string;
  sender: IUser;
  content: string;
  timestamp: Date;
}
