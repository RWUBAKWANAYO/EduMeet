"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const invitation_controller_1 = require("../controllers/invitation.controller");
const invitationRouter = express_1.default.Router();
invitationRouter.route("/send").post(middlewares_1.protectRoute, invitation_controller_1.sendInvitation);
invitationRouter.route("/confirm/:id").post(middlewares_1.protectRoute, invitation_controller_1.confirmInvitation);
invitationRouter.route("/email/confirm/:token").post(middlewares_1.protectRoute, invitation_controller_1.confirmInvitationWithEmail);
invitationRouter.route("/filter").get(middlewares_1.protectRoute, invitation_controller_1.filterInvitations);
exports.default = invitationRouter;
