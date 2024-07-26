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
exports.generateMeetingId = void 0;
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const generateUniqueNumber = () => Math.floor(10000000 + Math.random() * 900000000);
const generateMeetingId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let meetingId = id || generateUniqueNumber();
    let isUnique = false;
    while (!isUnique) {
        const existingMeeting = yield meeting_model_1.default.findOne({ session_id: meetingId });
        if (!existingMeeting)
            isUnique = true;
        meetingId = generateUniqueNumber();
    }
    return meetingId;
});
exports.generateMeetingId = generateMeetingId;
