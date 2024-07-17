import { protectRoute } from "../middlewares";
import { countUserMessages } from "../controllers/meeting.message.controller";
import express from "express";

const meetingMessageRouter = express.Router();

meetingMessageRouter.route("/count").get(protectRoute, countUserMessages);

export default meetingMessageRouter;
