"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const invitationSchema = new mongoose_1.default.Schema({
    meeting_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Meeting",
        required: [
            function () {
                return this.type === "meeting";
            },
            "Please enter the meeting ID",
        ],
    },
    message: {
        type: String,
    },
    sender_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter the sender ID"],
    },
    receiver_email: {
        type: String,
        required: [true, "Please enter the receiver email"],
    },
    receiver_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const Invitation = mongoose_1.default.model("Invitation", invitationSchema);
exports.default = Invitation;
