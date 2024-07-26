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
Object.defineProperty(exports, "__esModule", { value: true });
exports.meeitngChatsHandler = void 0;
const meeting_chat_controller_1 = require("../../controllers/meeting.chat.controller");
const meeting_message_controller_1 = require("../../controllers/meeting.message.controller");
const meeitngChatsHandler = (_io, socket) => {
    const messageHandler = (message) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = yield (0, meeting_message_controller_1.sendMeetingMessage)(message);
        if (!newMessage)
            return;
        return socket.to(`${message.chat}`).emit("meeting-message-received", message);
    });
    const joinMeetingChatHandler = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, chatType, participants }) {
        const chat = yield (0, meeting_chat_controller_1.createMeetingChat)({ roomId, chatType, members: participants });
        if (!chat || !chat._id)
            return;
        const chatId = chat._id.toString();
        const messages = yield (0, meeting_message_controller_1.getAllMeetingMessages)(chatId);
        socket.join(chatId);
        socket.emit("meeting-chat-joined", {
            chat,
            messages,
        });
    });
    socket.on("send-meeting-message", messageHandler);
    socket.on("join-meeting-chat", joinMeetingChatHandler);
};
exports.meeitngChatsHandler = meeitngChatsHandler;
