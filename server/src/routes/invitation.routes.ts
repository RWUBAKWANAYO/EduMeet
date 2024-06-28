import express from "express";
import { protectRoute } from "../middlewares";
import {
  confirmInvitation,
  filterInvitations,
  sendInvitation,
} from "../controllers/invitation.controller";

const invitationRouter = express.Router();

invitationRouter.route("/send").post(protectRoute, sendInvitation);
invitationRouter.route("/confirm/:token").post(protectRoute, confirmInvitation);
invitationRouter.route("/filter").get(protectRoute, filterInvitations);

export default invitationRouter;
