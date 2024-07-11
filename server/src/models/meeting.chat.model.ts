import mongoose from "mongoose";
import { IMeetingChat } from "../types/meeting.interface";

const MeetingChatSchema = new mongoose.Schema<IMeetingChat>(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingRoom",
      required: [true, "Room ID is required"],
    },
    chat_type: {
      type: String,
      enum: ["group", "single"],
      required: [true, "Chat type is required"],
    },
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: [
        function (this: any) {
          return this.chat_type === "single";
        },
        "members are required for single chat.",
      ],
      maxlength: 2,
    },
    latestMessage: {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const MeetingChat = mongoose.model<IMeetingChat>("MeetingChat", MeetingChatSchema);
export default MeetingChat;
