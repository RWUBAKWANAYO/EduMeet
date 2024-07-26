import { IUser } from "./user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
