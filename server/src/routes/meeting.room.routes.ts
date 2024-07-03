import { createMeetingRoom } from "../controllers/meeting.room.controller";
import express from "express";

const meetingRoomRouter = express.Router();

meetingRoomRouter.route("/").post(createMeetingRoom);

export default meetingRoomRouter;
