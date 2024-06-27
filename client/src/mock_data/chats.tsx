import { IUser } from "../types/users.interface";
import { users } from "./users";

export interface IMessage {
  _id?: string;
  user: IUser;
  content: string;
  timestamp: Date;
}

export const chats = [
  {
    _id: "chat1",
    user: users[0],
    content: "Hello",
    timestamp: new Date(),
  },
  {
    _id: "chat2",
    user: users[1],
    content: "Hi",
    timestamp: new Date(),
  },
  {
    _id: "chat3",
    user: users[2],
    content: "How are you?",
    timestamp: new Date(),
  },
  {
    _id: "chat4",
    user: users[3],
    content: "Good",
    timestamp: new Date(),
  },
  {
    _id: "chat5",
    user: users[4],
    content: "Great",
    timestamp: new Date(),
  },
];
