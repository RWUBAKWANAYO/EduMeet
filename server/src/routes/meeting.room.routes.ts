import { protectRoute } from "../middlewares";
import { createMeetingRoom, joinMeetingRoom } from "../controllers/meeting.room.controller";
import express from "express";

const meetingRoomRouter = express.Router();

meetingRoomRouter.route("/").post(createMeetingRoom);
meetingRoomRouter.route("/join/:roomId").get(protectRoute, joinMeetingRoom);

export default meetingRoomRouter;
