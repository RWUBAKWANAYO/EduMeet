import { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId | string;
  full_name: string;
  email: string;
  password: string;
  photo: string;
  active: boolean;
  pmi?: number;
  comparePassword(password: string, dbPassword: string): Promise<boolean>;
}
