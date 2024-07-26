import { protectRoute } from "../middlewares";
import {
	countMeetings,
	createMeeting,
	deleteMeeting,
	filterMeetings,
	getSingleMeeting,
	updateMeeting,
} from "../controllers/meeting.controller";
import express from "express";

const meetingRouter = express.Router();

meetingRouter.route("/").post(protectRoute, createMeeting);
meetingRouter
	.route("/:id")
	.get(protectRoute, getSingleMeeting)
	.patch(protectRoute, updateMeeting)
	.delete(protectRoute, deleteMeeting);
meetingRouter.route("/user/filter").get(protectRoute, filterMeetings);
meetingRouter.route("/user/count").get(protectRoute, countMeetings);

export default meetingRouter;
