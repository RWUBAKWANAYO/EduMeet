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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countMeetings = exports.updateMeetingStatus = exports.filterMeetings = exports.deleteMeeting = exports.updateMeeting = exports.getSingleMeeting = exports.createMeeting = void 0;
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const utils_1 = require("../utils");
const moment_1 = __importDefault(require("moment"));
exports.createMeeting = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { session_id } = _a, rest = __rest(_a, ["session_id"]);
    const meetingId = yield (0, utils_1.generateMeetingId)(req.body.session_id);
    const meeting = yield meeting_model_1.default.create(Object.assign(Object.assign({}, rest), { session_id: meetingId.toString() }));
    return res.status(201).json({ status: "success", data: meeting });
}));
exports.getSingleMeeting = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const meeting = yield meeting_model_1.default.findById(req.params.id);
    if (!meeting) {
        return next(new Error(`Meeting with id ${req.params.id} not found`));
    }
    return res.status(200).json({ status: "success", data: meeting });
}));
exports.updateMeeting = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id, session_id, host } = _a, rest = __rest(_a, ["_id", "session_id", "host"]);
    const meeting = yield meeting_model_1.default.findByIdAndUpdate(req.params.id, rest, {
        new: true,
        runValidators: true,
    });
    if (!meeting) {
        return next(new utils_1.ErrorFormat(`Meeting with id ${req.params.id} not found`, 404));
    }
    return res.status(200).json({ status: "success", data: meeting });
}));
exports.deleteMeeting = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const meeting = yield meeting_model_1.default.findByIdAndDelete(req.params.id);
    if (!meeting) {
        return next(new Error(`Meeting with id ${req.params.id} not found`));
    }
    return res.status(204).json({ status: "success", data: null });
}));
exports.filterMeetings = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const { status, session_id, startDate } = req.query;
    const query = {
        $or: [{ host: userId }, { participants: userId }],
    };
    if (status)
        query.status = status;
    if (session_id)
        query.session_id = session_id;
    if (startDate) {
        const date = new Date(startDate);
        const startOfDayDate = (0, moment_1.default)(date).startOf("day").toDate();
        const endOfDayDate = (0, moment_1.default)(date).endOf("day").toDate();
        query.start_time = {
            $gte: startOfDayDate,
            $lt: endOfDayDate,
        };
    }
    console.log("DATE.......", query);
    const meetings = yield meeting_model_1.default.find(query)
        .sort({ createdAt: -1 })
        .populate({
        path: "participants",
        select: "full_name photo",
    })
        .populate({
        path: "host",
        select: "full_name photo",
    });
    return res.status(200).json({ status: "success", count: meetings.length, data: meetings });
}));
const updateMeetingStatus = (meetingId, receiver, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meeting = yield meeting_model_1.default.findById(meetingId.toString());
        if (!meeting) {
            throw new Error("Meeting not found");
        }
        if (!meeting.participants.includes(receiver)) {
            meeting.participants.push(receiver);
            yield meeting.save();
        }
        return meeting;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateMeetingStatus = updateMeetingStatus;
exports.countMeetings = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const query = {
        $or: [{ host: userId }, { participants: userId }],
    };
    const counts = yield Promise.all([
        meeting_model_1.default.countDocuments({ host: userId }),
        meeting_model_1.default.countDocuments(Object.assign(Object.assign({}, query), { status: "upcoming" })),
        meeting_model_1.default.countDocuments(Object.assign(Object.assign({}, query), { status: "ongoing" })),
        meeting_model_1.default.countDocuments(Object.assign(Object.assign({}, query), { status: "ended" })),
    ]);
    const [hostedCount, upcomingCount, ongoingCount, endedCount] = counts;
    return res.status(200).json({
        status: "success",
        data: {
            hosted: hostedCount,
            upcoming: upcomingCount,
            ongoing: ongoingCount,
            ended: endedCount,
            total: upcomingCount + ongoingCount + endedCount,
        },
    });
}));
