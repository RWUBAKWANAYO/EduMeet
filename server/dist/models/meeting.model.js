"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const meetingSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
meetingSchema.index({ start_time: 1 });
meetingSchema.index({ end_time: 1 });
meetingSchema.index({ status: 1 });
meetingSchema.index({ session_id: 1 });
const Meeting = mongoose_1.default.model("Meeting", meetingSchema);
exports.default = Meeting;
