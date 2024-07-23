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
const newSingleChat = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, members }) {
    if (!members || members.length !== 2) {
        throw new utils_1.ErrorFormat(`A single chat must have exactly 2 members`, 400);
    }
    const memberIds = members.map((member) => new mongoose_1.default.Types.ObjectId(member));
    const chatQuery = {
        room_id: new mongoose_1.default.Types.ObjectId(roomId),
        chat_type: "single",
        members: { $all: memberIds },
    };
    try {
        const existingChat = yield meeting_chat_model_1.default.findOne(chatQuery).populate({
            path: "members",
            select: " full_name photo",
        });
        if (existingChat)
            return existingChat;
        const newChat = yield meeting_chat_model_1.default.create(Object.assign(Object.assign({}, chatQuery), { members: memberIds }));
        return yield newChat.populate({
            path: "members",
            select: " full_name photo",
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const newGroupChat = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const chatQuery = {
        room_id: new mongoose_1.default.Types.ObjectId(roomId),
        chat_type: "group",
    };
    try {
        const existingChat = yield meeting_chat_model_1.default.findOne(chatQuery).populate({
            path: "members",
            select: " full_name photo",
        });
        if (existingChat)
            return existingChat;
        const newChat = yield meeting_chat_model_1.default.create(chatQuery);
        return newChat;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createMeetingChat = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, chatType, members }) {
    try {
        const meetingRoom = yield meeting_room_model_1.default.findById(roomId);
        if (!meetingRoom)
            throw new utils_1.ErrorFormat(`Meeting room with id ${roomId} not found`, 404);
        if (chatType === "single")
            return newSingleChat({ roomId, members });
        return newGroupChat(roomId);
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
