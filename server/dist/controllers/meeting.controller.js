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
exports.filterMeetings = exports.deleteMeeting = exports.updateMeeting = exports.getSingleMeeting = exports.createMeeting = void 0;
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const utils_1 = require("../utils");
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
    const { status, session_id } = req.query;
    const query = {
        $or: [{ host: userId }, { participants: userId }],
    };
    if (status)
        query.status = status;
    if (session_id)
        query.session_id = session_id;
    const meetings = yield meeting_model_1.default.find(query).populate({
        path: "participants",
        select: "full_name photo",
    });
    return res.status(200).json({ status: "success", count: meetings.length, data: meetings });
}));
