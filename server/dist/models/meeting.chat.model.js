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
MeetingChatSchema.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const chat = this;
        yield mongoose_1.default.models.MeetingMessage.deleteMany({ chat: chat._id });
        next();
    });
});
const MeetingChat = mongoose_1.default.model("MeetingChat", MeetingChatSchema);
exports.default = MeetingChat;
