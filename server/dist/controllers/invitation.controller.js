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
exports.countInvitations = exports.filterInvitations = exports.confirmInvitationWithEmail = exports.confirmInvitation = exports.sendInvitation = void 0;
const utils_1 = require("../utils");
const invitation_model_1 = __importDefault(require("../models/invitation.model"));
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const meeting_controller_1 = require("./meeting.controller");
exports.sendInvitation = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { receivers, meeting_id, sender_id, message, status } = req.body;
    const meeting = yield meeting_model_1.default.findById(meeting_id);
    if (!meeting) {
        return next(new utils_1.ErrorFormat(`Meeting with id ${meeting_id} not found`, 404));
    }
    const { invitations, tokens } = (0, utils_1.generateInvitations)({
        receivers,
        meeting_id,
        sender_id,
        message,
        status,
    });
    const createdInvitations = yield invitation_model_1.default.insertMany(invitations);
    yield (0, utils_1.sendInvitationEmails)({
        createdInvitations,
        tokens,
        meeting,
        full_name: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.full_name) || "",
    });
    createdInvitations.forEach((invitation) => (invitation.confirmationToken = undefined));
    return res.status(201).json({ status: "success", data: createdInvitations });
}));
exports.confirmInvitation = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const invitation = yield invitation_model_1.default.findById(id);
    if (!invitation) {
        return next(new utils_1.ErrorFormat("Invalid invitation id", 400));
    }
    const updatedMeeting = yield (0, meeting_controller_1.updateMeetingStatus)(invitation.meeting_id, invitation.receiver_id, next);
    if (!updatedMeeting) {
        return next(new utils_1.ErrorFormat("Fail to update meeting status", 400));
    }
    invitation.status = "accepted";
    yield invitation.save();
    return res.status(200).json({ status: "success", data: invitation });
}));
exports.confirmInvitationWithEmail = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const hashedToken = (0, utils_1.hashToken)(token);
    const invitation = yield invitation_model_1.default.findOne({ confirmationToken: hashedToken });
    if (!invitation) {
        return next(new utils_1.ErrorFormat("Invalid confirmation token", 400));
    }
    yield (0, meeting_controller_1.updateMeetingStatus)(invitation.meeting_id, invitation.receiver_id, next);
    invitation.status = "accepted";
    yield invitation.save();
    return res.status(200).json({ status: "success", data: invitation });
}));
exports.filterInvitations = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { status, meeting_id, role } = req.query;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    let filter = {};
    if (status)
        filter.status = status;
    if (meeting_id)
        filter.meeting_id = meeting_id;
    if (role) {
        role === "sender" ? (filter.sender_id = userId) : (filter.receiver_id = userId);
    }
    else {
        filter = Object.assign(Object.assign({}, filter), { $or: [{ sender_id: userId }, { receiver_id: userId }] });
    }
    const invitations = yield invitation_model_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate({
        path: "meeting_id",
        select: "title start_time end_time status",
    })
        .populate({
        path: "sender_id",
        select: "full_name email photo",
    })
        .populate({
        path: "receiver_id",
        select: "full_name email photo",
    });
    return res
        .status(200)
        .json({ status: "success", count: invitations.length, data: invitations });
}));
exports.countInvitations = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const counts = yield Promise.all([
        invitation_model_1.default.countDocuments({ sender_id: userId }),
        invitation_model_1.default.countDocuments({ receiver_id: userId }),
        invitation_model_1.default.countDocuments({ sender_id: userId, status: "pending" }),
        invitation_model_1.default.countDocuments({ sender_id: userId, status: "accepted" }),
        invitation_model_1.default.countDocuments({ receiver_id: userId, status: "pending" }),
        invitation_model_1.default.countDocuments({ receiver_id: userId, status: "accepted" }),
    ]);
    const [sentCount, receivedCount, sentPendingCount, sentAcceptedCount, receivedPendingCount, receivedAcceptedCount,] = counts;
    return res.status(200).json({
        status: "success",
        data: {
            sent: sentCount,
            received: receivedCount,
            sentPending: sentPendingCount,
            sentAccepted: sentAcceptedCount,
            ReceivedPending: receivedPendingCount,
            ReceivedAccepted: receivedAcceptedCount,
        },
    });
}));
