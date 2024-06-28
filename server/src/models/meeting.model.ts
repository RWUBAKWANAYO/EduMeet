import mongoose from "mongoose";
import { IMeeting } from "../types/meeting.interface";

const meetingSchema = new mongoose.Schema<IMeeting>(
  {
    title: {
      type: String,
      required: [true, "Please enter the meeting title"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    session_id: {
      type: String,
      required: [true, "Please enter the meeting session ID"],
      unique: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "ended"],
      default: "upcoming",
    },
    start_time: {
      type: Date,
      required: [true, "Please enter the meeting start time"],
    },
    end_time: {
      type: Date,
      required: [true, "Please enter the meeting start time"],
    },
    isInstant: {
      type: Boolean,
      default: false,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    passcode_required: {
      type: Boolean,
      default: false,
    },

    passcode: {
      type: String,
    },
    waiting_room: {
      type: Boolean,
      default: true,
    },
    require_confirm: {
      type: Boolean,
      default: true,
    },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    video: {
      host: {
        type: String,
        enum: ["on", "off"],
        default: "on",
      },
      participants: {
        type: String,
        enum: ["on", "off"],
        default: "on",
      },
    },
  },
  {
    timestamps: true,
  }
);

meetingSchema.index({ start_time: 1 });
meetingSchema.index({ end_time: 1 });
meetingSchema.index({ status: 1 });
meetingSchema.index({ session_id: 1 });

const Meeting = mongoose.model<IMeeting>("Meeting", meetingSchema);
export default Meeting;
