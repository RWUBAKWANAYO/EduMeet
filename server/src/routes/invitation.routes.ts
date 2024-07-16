import express from "express";
import { protectRoute } from "../middlewares";
import {
	confirmInvitation,
	confirmInvitationWithEmail,
	filterInvitations,
	sendInvitation,
} from "../controllers/invitation.controller";

const invitationRouter = express.Router();

invitationRouter.route("/send").post(protectRoute, sendInvitation);
invitationRouter.route("/confirm/:id").post(protectRoute, confirmInvitation);
invitationRouter.route("/email/confirm/:token").post(protectRoute, confirmInvitationWithEmail);
invitationRouter.route("/filter").get(protectRoute, filterInvitations);

export default invitationRouter;
