import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import meetingRouter from "./routes/meeting.routes";
import meetingRoomRouter from "./routes/meeting.room.routes";
import meetingMessageRouter from "./routes/meeting.message.routes";

import invitationRouter from "./routes/invitation.routes";
import updateMeetingStatuses from "./jobs/scheduler/updateMeetingStatuses";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/meetings", meetingRouter);
app.use("/api/v1/meeting-rooms", meetingRoomRouter);
app.use("/api/v1/meeting-messages", meetingMessageRouter);
app.use("/api/v1/invitations", invitationRouter);

//jobs
updateMeetingStatuses();

export default app;
