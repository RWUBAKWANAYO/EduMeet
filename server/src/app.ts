import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import meetingRouter from "./routes/meeting.routes";
import meetingRoomRouter from "./routes/meeting.room.routes";

import invitationRouter from "./routes/invitation.routes";
import { testChat } from "./controllers/meeting.chat.controller";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/meetings", meetingRouter);
app.use("/api/v1/meeting-rooms", meetingRoomRouter);
app.use("/api/v1/invitations", invitationRouter);
const router = express.Router();
router.route("/").post(testChat);
app.use("/api/v1/chat-test", router);

export default app;
