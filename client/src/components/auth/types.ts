import { IUser } from "../../types/users.interface";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
