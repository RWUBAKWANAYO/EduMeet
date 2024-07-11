"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeetingMessageSchema = new mongoose_1.default.Schema({
    chat: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MeetingChat",
        required: [true, "Chat ID is required"],
    },
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Sender ID is required"],
    },
    content: {
        type: String,
        required: [true, "Message content is required"],
    },
}, {
    timestamps: true,
});
const MeetingMessage = mongoose_1.default.model("MeetingMessage", MeetingMessageSchema);
exports.default = MeetingMessage;
