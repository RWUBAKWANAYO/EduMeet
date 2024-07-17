import { protectRoute } from "../middlewares";
import express from "express";
import { userMeetingStatsCount } from "../controllers/meeting.stats.controller";

const meetingStatsRouter = express.Router();

meetingStatsRouter.route("/count").get(protectRoute, userMeetingStatsCount);

export default meetingStatsRouter;
