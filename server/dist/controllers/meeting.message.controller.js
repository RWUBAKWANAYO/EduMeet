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
exports.getAllMeetingMessages = exports.sendMeetingMessage = void 0;
const utils_1 = require("../utils");
const meeting_message_model_1 = __importDefault(require("../models/meeting.message.model"));
const meeting_chat_controller_1 = require("./meeting.chat.controller");
const sendMeetingMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedChat = yield (0, meeting_chat_controller_1.updateLatestMessage)(message);
        if (!updatedChat)
            return new utils_1.ErrorFormat("Chat not found", 404);
        const newMessage = yield meeting_message_model_1.default.create(message);
        return newMessage;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.sendMeetingMessage = sendMeetingMessage;
const getAllMeetingMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield meeting_message_model_1.default.find({ chat: chatId }).populate({
            path: "sender",
            select: " full_name email photo",
        });
        return messages;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getAllMeetingMessages = getAllMeetingMessages;
