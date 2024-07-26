"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const meetingStatsSchema = new mongoose_1.default.Schema({
    room: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MeetingRoom",
        required: [true, "Room ID is required"],
    },
    meeting: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Meeting",
        required: [true, "Meeting ID is required"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender ID is required"],
    },
    presence: {
        type: Boolean,
        default: false,
    },
    attendances: {
        type: [
            {
                start_time: {
                    type: Date,
                },
                end_time: {
                    type: Date,
                },
            },
        ],
        default: [],
    },
    recordings: {
        type: [
            {
                start_time: {
                    type: Date,
                },
                end_time: {
                    type: Date,
                },
            },
        ],
        default: [],
    },
    audio_muted: {
        type: [
            {
                start_time: {
                    type: Date,
                },
                end_time: {
                    type: Date,
                },
            },
        ],
        default: [],
    },
    video_muted: {
        type: [
            {
                start_time: {
                    type: Date,
                },
                end_time: {
                    type: Date,
                },
            },
        ],
        default: [],
    },
    screen_sharing: {
        type: [
            {
                start_time: {
                    type: Date,
                },
                end_time: {
                    type: Date,
                },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
const MeetingStats = mongoose_1.default.model("MeetingStats", meetingStatsSchema);
exports.default = MeetingStats;
