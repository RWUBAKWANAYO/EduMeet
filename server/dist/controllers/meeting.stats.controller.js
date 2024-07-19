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
exports.fiterMeetingStats = exports.userMeetingStatsCount = exports.updateMeetingStats = exports.createMeetingStats = void 0;
const utils_1 = require("../utils");
const meeting_stats_model_1 = __importDefault(require("../models/meeting.stats.model"));
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const createMeetingStats = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, meetingId, participants }) {
    if (!participants || !roomId || !meetingId)
        return;
    try {
        const existingStats = yield meeting_stats_model_1.default.findOne({ room: roomId });
        if (existingStats)
            return existingStats;
        const stats = participants.map((participant) => ({
            room: roomId,
            meeting: meetingId,
            user: participant,
        }));
        const meetingStats = yield meeting_stats_model_1.default.insertMany(stats);
        return meetingStats;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createMeetingStats = createMeetingStats;
const updateMeetingStats = (_a) => __awaiter(void 0, [_a], void 0, function* ({ action, roomId, userId }) {
    if (!roomId || !action || !userId)
        return;
    try {
        const stats = yield meeting_stats_model_1.default.findOne({ room: roomId, user: userId });
        if (!stats)
            return;
        stats.presence = true;
        switch (action) {
            case "join_meeting":
                stats.attendances.push({ start_time: new Date() });
                break;
            case "leave_meeting":
                stats.attendances[stats.attendances.length - 1].end_time = new Date();
                break;
            case "audio_unmuted":
                stats.audio_muted.push({ start_time: new Date() });
                break;
            case "audio_muted":
                stats.audio_muted[stats.audio_muted.length - 1].end_time = new Date();
                break;
            case "video_unmuted":
                stats.video_muted.push({ start_time: new Date() });
                break;
            case "video_muted":
                stats.video_muted[stats.video_muted.length - 1].end_time = new Date();
                break;
            case "start_sharing":
                stats.screen_sharing.push({ start_time: new Date() });
                break;
            case "stop_sharing":
                stats.screen_sharing[stats.screen_sharing.length - 1].end_time = new Date();
                break;
            case "start_recording":
                stats.recordings.push({ start_time: new Date() });
                break;
            case "stop_recording":
                stats.recordings[stats.recordings.length - 1].end_time = new Date();
                break;
            default:
                return stats;
        }
        yield stats.save();
        return stats;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateMeetingStats = updateMeetingStats;
exports.userMeetingStatsCount = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const counts = yield Promise.all([
        meeting_stats_model_1.default.countDocuments({ user: userId, presence: true }),
        meeting_stats_model_1.default.countDocuments({ user: userId, presence: false }),
        meeting_stats_model_1.default.countDocuments({
            user: userId,
            "recordings.0": { $exists: true },
        }),
    ]);
    const [attendedCount, missedCount, recordingsCount] = counts;
    return res.status(200).json({
        status: "success",
        data: {
            attended: attendedCount,
            missed: missedCount,
            recordings: recordingsCount,
        },
    });
}));
exports.fiterMeetingStats = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const { roomId, meetingId } = req.query;
    const existMeeting = yield meeting_model_1.default.findOne({ _id: meetingId });
    if (!existMeeting)
        next(new utils_1.ErrorFormat("Meeting not found", 404));
    console.log(existMeeting, "..");
    const query = {};
    if ((existMeeting === null || existMeeting === void 0 ? void 0 : existMeeting.host.toString()) !== userId)
        query.user = userId;
    if (roomId)
        query.room = roomId;
    if (meetingId)
        query.meeting = meetingId;
    console.log(query, "query..");
    const stats = yield meeting_stats_model_1.default.find(query)
        .populate("room")
        .populate({
        path: "meeting",
        populate: [
            {
                path: "participants",
                select: " full_name photo",
            },
            {
                path: "host",
                select: " full_name photo",
            },
        ],
    })
        .populate({
        path: "user",
        select: "full_name email photo",
    });
    return res.status(200).json({
        status: "success",
        data: stats,
    });
}));
