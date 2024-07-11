"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeetingChatSchema = new mongoose_1.default.Schema({
    room_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        required: [
            function () {
                return this.chat_type === "single";
            },
            "members are required for single chat.",
        ],
        maxlength: 2,
    },
    latestMessage: {
        sender: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
        },
    },
}, {
    timestamps: true,
});
const MeetingChat = mongoose_1.default.model("MeetingChat", MeetingChatSchema);
exports.default = MeetingChat;
