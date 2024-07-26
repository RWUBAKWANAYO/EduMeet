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
exports.sendInvitationEmails = exports.generateInvitations = void 0;
const email_1 = require("../services/email");
const confirmationToken_1 = require("./confirmationToken");
const emailMessage_1 = require("./emailMessage");
const generateInvitations = ({ receivers, meeting_id, sender_id, message, status, }) => {
    const tokens = {};
    const invitations = receivers.map((receiver) => {
        const token = receiver._id ? (0, confirmationToken_1.generateToken)() : undefined;
        tokens[receiver.email] = token;
        const hashedToken = token && receiver._id ? (0, confirmationToken_1.hashToken)(token) : undefined;
        const invitation = {
            sender_id,
            receiver_email: receiver.email,
            receiver_id: receiver._id || undefined,
            status,
            confirmationToken: hashedToken,
            meeting_id,
            message,
        };
        return invitation;
    });
    return { invitations, tokens };
};
exports.generateInvitations = generateInvitations;
const sendInvitationEmails = (_a) => __awaiter(void 0, [_a], void 0, function* ({ createdInvitations, tokens: _, meeting, full_name, }) {
    const emailPromises = createdInvitations.map((invitation) => {
        const confirmationLink = invitation.receiver_id
            ? `${process.env.CLIENT_URL}/invitations`
            : undefined;
        return (0, email_1.sendMail)({
            email: invitation.receiver_email,
            subject: `Meeting Invitation: ${meeting.title}`,
            type: "html",
            message: (0, emailMessage_1.meetingEmailMessage)({
                full_name,
                meeting_id: meeting.session_id,
                scheduled_at: meeting.start_time,
                passcodeRequired: meeting.passcode_required,
                passcode: meeting.passcode,
                client_url: `${process.env.CLIENT_URL}/join-meeting/${meeting.session_id}`,
                confirmationLink,
            }),
        });
    });
    yield Promise.all(emailPromises);
});
exports.sendInvitationEmails = sendInvitationEmails;
