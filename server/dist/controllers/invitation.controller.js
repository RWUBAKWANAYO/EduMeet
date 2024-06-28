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
exports.filterInvitations = exports.confirmInvitation = exports.sendInvitation = void 0;
const utils_1 = require("../utils");
const invitation_model_1 = __importDefault(require("../models/invitation.model"));
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
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
    const { token } = req.params;
    const hashedToken = (0, utils_1.hashToken)(token);
    const invitation = yield invitation_model_1.default.findOne({ confirmationToken: hashedToken });
    if (!invitation) {
        return next(new utils_1.ErrorFormat("Invalid confirmation token", 400));
    }
    const meeting = yield meeting_model_1.default.findById(invitation.meeting_id);
    if (!meeting) {
        return next(new utils_1.ErrorFormat("Meeting not found", 404));
    }
    if (!invitation.receiver_id)
        return next(new utils_1.ErrorFormat("Receiver not found", 404));
    const receiverId = invitation.receiver_id;
    if (!meeting.participants.includes(receiverId)) {
        meeting.participants.push(receiverId);
        yield meeting.save();
    }
    invitation.status = "accepted";
    yield invitation.save();
    return res.status(200).json({ status: "success", data: invitation });
}));
exports.filterInvitations = (0, utils_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { status, meeting_id } = req.query;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    const filter = {
        $or: [{ sender_id: userId }, { receiver_id: userId }],
    };
    if (status)
        filter.status = status;
    if (meeting_id)
        filter.meeting_id = meeting_id;
    const invitations = yield invitation_model_1.default.find(filter);
    return res.status(200).json({ status: "success", count: invitations.length, data: invitations });
}));
