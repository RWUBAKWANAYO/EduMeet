import Meeting from "../models/meeting.model";
import { Request, Response, NextFunction } from "express";
import { ErrorFormat, asyncErrorHandler, generateMeetingId } from "../utils";
import { IMeeting } from "../types/meeting.interface";
import moment from "moment";
export const createMeeting = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { session_id, ...rest } = req.body;
		const meetingId = await generateMeetingId(req.body.session_id);
		const meeting: IMeeting = await Meeting.create({ ...rest, session_id: meetingId.toString() });
		return res.status(201).json({ status: "success", data: meeting });
	}
);

export const getSingleMeeting = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const meeting = await Meeting.findById(req.params.id);
		if (!meeting) {
			return next(new Error(`Meeting with id ${req.params.id} not found`));
		}
		return res.status(200).json({ status: "success", data: meeting });
	}
);

export const updateMeeting = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { _id, session_id, host, ...rest } = req.body;
		const meeting = await Meeting.findByIdAndUpdate(req.params.id, rest, {
			new: true,
			runValidators: true,
		});

		if (!meeting) {
			return next(new ErrorFormat(`Meeting with id ${req.params.id} not found`, 404));
		}
		return res.status(200).json({ status: "success", data: meeting });
	}
);

export const deleteMeeting = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const meeting = await Meeting.findByIdAndDelete(req.params.id);
		if (!meeting) {
			return next(new Error(`Meeting with id ${req.params.id} not found`));
		}
		return res.status(204).json({ status: "success", data: null });
	}
);

export const filterMeetings = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user?._id?.toString();
		const { status, session_id, startDate } = req.query;

		const query: any = {
			$or: [{ host: userId }, { participants: userId }],
		};
		if (status) query.status = status;
		if (session_id) query.session_id = session_id;

		if (startDate) {
			const date = new Date(startDate as any);
			const startOfDayDate = moment(date).startOf("day").toDate();
			const endOfDayDate = moment(date).endOf("day").toDate();

			query.start_time = {
				$gte: startOfDayDate,
				$lt: endOfDayDate,
			};
		}

		const meetings = await Meeting.find(query).populate({
			path: "participants",
			select: "full_name photo",
		});
		return res.status(200).json({ status: "success", count: meetings.length, data: meetings });
	}
);

export const updateMeetingStatus = async (meetingId: any, receiver: any, _next: NextFunction) => {
	try {
		const meeting = await Meeting.findById(meetingId.toString());
		if (!meeting) {
			throw new Error("Meeting not found");
		}

		if (!meeting.participants.includes(receiver)) {
			meeting.participants.push(receiver);
			await meeting.save();
		}
		return meeting;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const countMeetings = asyncErrorHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user?._id?.toString();
		const query: any = {
			$or: [{ host: userId }, { participants: userId }],
		};

		const counts = await Promise.all([
			Meeting.countDocuments({ host: userId }),
			Meeting.countDocuments({ ...query, status: "upcoming" }),
			Meeting.countDocuments({ ...query, status: "ongoing" }),
			Meeting.countDocuments({ ...query, status: "ended" }),
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
	}
);
