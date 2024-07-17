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
import { updateMeetingStatus } from "./meeting.controller";

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
		const { id } = req.params;
		const invitation = await Invitation.findById(id);
		if (!invitation) {
			return next(new ErrorFormat("Invalid invitation id", 400));
		}
		const updatedMeeting = await updateMeetingStatus(
			invitation.meeting_id,
			invitation.receiver_id,
			next
		);
		if (!updatedMeeting) {
			return next(new ErrorFormat("Fail to update meeting status", 400));
		}
		invitation.status = "accepted";
		await invitation.save();
		return res.status(200).json({ status: "success", data: invitation });
	}
);

export const confirmInvitationWithEmail = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { token } = req.params;
		const hashedToken = hashToken(token);
		const invitation = await Invitation.findOne({ confirmationToken: hashedToken });
		if (!invitation) {
			return next(new ErrorFormat("Invalid confirmation token", 400));
		}

		await updateMeetingStatus(invitation.meeting_id, invitation.receiver_id, next);

		invitation.status = "accepted";
		await invitation.save();
		return res.status(200).json({ status: "success", data: invitation });
	}
);

export const filterInvitations = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { status, meeting_id, role } = req.query;
		const userId = req.user?._id?.toString();
		let filter: any = {};
		if (status) filter.status = status;
		if (meeting_id) filter.meeting_id = meeting_id;
		if (role) {
			role === "sender" ? (filter.sender_id = userId) : (filter.receiver_id = userId);
		} else {
			filter = { ...filter, $or: [{ sender_id: userId }, { receiver_id: userId }] };
		}
		const invitations = await Invitation.find(filter)
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
	}
);
