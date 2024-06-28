import { IGenerateInvitation } from "../types/invitation.interface";
import { sendMail } from "../services/email";
import { generateToken, hashToken } from "./confirmationToken";
import { meetingEmailMessage } from "./emailMessage";
import { ISendInvitationEmails } from "../types/email.interface";

export const generateInvitations = ({
  receivers,
  meeting_id,
  sender_id,
  message,
  status,
}: IGenerateInvitation) => {
  const tokens: Record<string, string | undefined> = {};
  const invitations = receivers.map((receiver: { email: string; _id: string }) => {
    const token = receiver._id ? generateToken() : undefined;
    tokens[receiver.email] = token;
    const hashedToken = token && receiver._id ? hashToken(token) : undefined;

    const invitation: any = {
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

export const sendInvitationEmails = async ({
  createdInvitations,
  tokens,
  meeting,
  full_name,
}: ISendInvitationEmails) => {
  const emailPromises = createdInvitations.map((invitation) => {
    const confirmationLink = invitation.receiver_id
      ? `${process.env.CLIENT_URL}/invitations/meeting/confirm/${tokens[invitation.receiver_email]}`
      : undefined;

    return sendMail({
      email: invitation.receiver_email,
      subject: `Meeting Invitation: ${meeting.title}`,
      type: "html",
      message: meetingEmailMessage({
        full_name,
        meeting_id: meeting.session_id,
        scheduled_at: meeting.start_time,
        passcodeRequired: meeting.passcode_required,
        passcode: meeting.passcode,
        client_url: `${process.env.CLIENT_URL}/meeting/${meeting.meeting_id}`,
        confirmationLink,
      }),
    });
  });
  await Promise.all(emailPromises);
};
