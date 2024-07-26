import { protectRoute } from "../middlewares";
import express from "express";
import { fiterMeetingStats, userMeetingStatsCount } from "../controllers/meeting.stats.controller";

const meetingStatsRouter = express.Router();

meetingStatsRouter.route("/count").get(protectRoute, userMeetingStatsCount);
meetingStatsRouter.route("/filter").get(protectRoute, fiterMeetingStats);

export default meetingStatsRouter;
