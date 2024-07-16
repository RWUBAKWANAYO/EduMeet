import { IUser } from "../../types/users.interface";

export interface IAuthData {
  full_name?:string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
