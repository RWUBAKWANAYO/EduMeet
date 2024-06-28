import mongoose, { Document } from "mongoose";

export interface IMeeting extends Document {
  _id?: mongoose.Schema.Types.ObjectId | string;
  title: string;
  description: string;
  session_id: string | number;
  status: string;
  start_time: Date;
  end_time: Date;
  isInstant: boolean;
  host: mongoose.Schema.Types.ObjectId | string;
  passcode_required: boolean;
  waiting_room: boolean;
  require_confirm: boolean;
  passcode: string;
  participants: mongoose.Schema.Types.ObjectId[] | string[];
  video: {
    host: string;
    participants: string;
  };
}
