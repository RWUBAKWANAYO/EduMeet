"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
meetingRoom.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = this;
        yield mongoose_1.default.models.MeetingChat.deleteMany({ room_id: room._id });
        next();
    });
});
const MeetingRoom = mongoose_1.default.model("MeetingRoom", meetingRoom);
exports.default = MeetingRoom;
