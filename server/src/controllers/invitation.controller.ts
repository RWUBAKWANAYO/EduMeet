import { Request, Response, NextFunction } from "express";
import {
  ErrorFormat,
  asyncErrorHandler,
  generateInvitations,
  hashToken,
  sendInvitationEmails,
} from "../utils";
import Invitation from "../models/invitation.model";
import Meeting from "../models/meeting.model";

export const sendInvitation = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { receivers, meeting_id, sender_id, message, status } = req.body;

    const meeting = await Meeting.findById(meeting_id);
    if (!meeting) {
      return next(new ErrorFormat(`Meeting with id ${meeting_id} not found`, 404));
    }

    const { invitations, tokens } = generateInvitations({
      receivers,
      meeting_id,
      sender_id,
      message,
      status,
    });

    const createdInvitations = await Invitation.insertMany(invitations);

    await sendInvitationEmails({
      createdInvitations,
      tokens,
      meeting,
      full_name: req.user?.full_name || "",
    });
    createdInvitations.forEach((invitation) => (invitation.confirmationToken = undefined));
    return res.status(201).json({ status: "success", data: createdInvitations });
  }
);

export const confirmInvitation = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const hashedToken = hashToken(token);
    const invitation = await Invitation.findOne({ confirmationToken: hashedToken });
    if (!invitation) {
      return next(new ErrorFormat("Invalid confirmation token", 400));
    }

    const meeting = await Meeting.findById(invitation.meeting_id);
    if (!meeting) {
      return next(new ErrorFormat("Meeting not found", 404));
    }
    if (!invitation.receiver_id) return next(new ErrorFormat("Receiver not found", 404));

    const receiverId = invitation.receiver_id;

    if (!meeting.participants.includes(receiverId)) {
      meeting.participants.push(receiverId);
      await meeting.save();
    }

    invitation.status = "accepted";
    await invitation.save();
    return res.status(200).json({ status: "success", data: invitation });
  }
);

export const filterInvitations = asyncErrorHandler(async (req: Request, res: Response) => {
  const { status, meeting_id } = req.query;
  const userId = req.user?._id?.toString();
  const filter: any = {
    $or: [{ sender_id: userId }, { receiver_id: userId }],
  };

  if (status) filter.status = status;
  if (meeting_id) filter.meeting_id = meeting_id;
  const invitations = await Invitation.find(filter);
  return res.status(200).json({ status: "success", count: invitations.length, data: invitations });
});
