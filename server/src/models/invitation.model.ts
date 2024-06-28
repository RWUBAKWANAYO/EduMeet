import mongoose from "mongoose";
import { IInvitaion } from "../types/invitation.interface";

const invitationSchema = new mongoose.Schema<IInvitaion>(
  {
    meeting_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: [
        function (this: any) {
          return this.type === "meeting";
        },
        "Please enter the meeting ID",
      ],
    },

    message: {
      type: String,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the sender ID"],
    },
    receiver_email: {
      type: String,
      required: [true, "Please enter the receiver email"],
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    confirmationToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model<IInvitaion>("Invitation", invitationSchema);
export default Invitation;
