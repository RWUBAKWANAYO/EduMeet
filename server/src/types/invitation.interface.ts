import mongoose, { Document } from "mongoose";

export interface IInvitaion extends Document {
  meeting_id: mongoose.Schema.Types.ObjectId;
  message: string;
  sender_id: mongoose.Schema.Types.ObjectId;
  receiver_email: string;
  receiver_id?: mongoose.Schema.Types.ObjectId;
  status: string;
  confirmationToken?: string | undefined;
}

export interface IGenerateInvitation {
  receivers: any[];
  meeting_id?: mongoose.Schema.Types.ObjectId | string | undefined;
  sender_id: mongoose.Schema.Types.ObjectId | string;
  message?: string;
  status: string;
}
