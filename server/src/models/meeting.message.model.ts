import mongoose from "mongoose";
import { IMeetingMessage } from "../types/meeting.interface";

const MeetingMessageSchema = new mongoose.Schema<IMeetingMessage>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingChat",
      required: [true, "Chat ID is required"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MeetingMessage = mongoose.model<IMeetingMessage>("MeetingMessage", MeetingMessageSchema);
export default MeetingMessage;
