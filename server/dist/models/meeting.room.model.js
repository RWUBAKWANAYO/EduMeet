"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const meetingRoom = new mongoose_1.default.Schema({
    meeting_type: {
        type: String,
        enum: ["instant", "scheduled"],
        required: [true, "meeting type (instant or scheduled) is required"],
    },
    session_id: {
        type: Number,
        required: [true, "Session ID is required"],
    },
    attendees: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        default: [],
    },
    meeting: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Meeting",
        required: [
            function () {
                return this.meeting_type === "scheduled";
            },
            "Meeting ID is required for scheduled meetings.",
        ],
    },
}, {
    timestamps: true,
});
const MeetingRoom = mongoose_1.default.model("MeetingRoom", meetingRoom);
exports.default = MeetingRoom;
