import { protectRoute } from "../middlewares";
import { getUser, getUsers, getUsersWithInvitationStatus } from "../controllers/user.controller";
import express from "express";

const userRouter = express.Router();

userRouter.route("/").get(protectRoute, getUsers);
userRouter.route("/:id").get(getUser);
userRouter
  .route("/with-invitation-status/:meetingId")
  .get(protectRoute, getUsersWithInvitationStatus);

export default userRouter;
