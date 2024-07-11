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
exports.updateLatestMessage = exports.createMeetingChat = void 0;
const meeting_chat_model_1 = __importDefault(require("../models/meeting.chat.model"));
const meeting_room_model_1 = __importDefault(require("../models/meeting.room.model"));
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
const createMeetingChat = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, chatType, members }) {
    try {
        const meetingRoom = yield meeting_room_model_1.default.findById(roomId);
        if (!meetingRoom) {
            new utils_1.ErrorFormat(`Meeting room with id ${roomId} not found`, 404);
            return;
        }
        let chatQuery = {
            room_id: new mongoose_1.default.Types.ObjectId(roomId),
            chat_type: chatType,
        };
        if (chatType === "single")
            chatQuery["members"] = { $all: members };
        const existingChat = yield meeting_chat_model_1.default.findOne(chatQuery);
        if (existingChat)
            return existingChat;
        const newChat = yield meeting_chat_model_1.default.create(chatQuery);
        return newChat;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createMeetingChat = createMeetingChat;
const updateLatestMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedChat = yield meeting_chat_model_1.default.findById(message.chat);
        if (!updatedChat)
            throw new Error(`Chat with id ${message.chat} not found`);
        updatedChat.latestMessage = {
            sender: message.sender,
            content: message.content,
        };
        yield updatedChat.save();
        return updatedChat;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateLatestMessage = updateLatestMessage;
