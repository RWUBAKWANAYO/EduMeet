"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const meeting_controller_1 = require("../controllers/meeting.controller");
const express_1 = __importDefault(require("express"));
const meetingRouter = express_1.default.Router();
meetingRouter.route("/").post(middlewares_1.protectRoute, meeting_controller_1.createMeeting);
meetingRouter
    .route("/:id")
    .get(middlewares_1.protectRoute, meeting_controller_1.getSingleMeeting)
    .patch(middlewares_1.protectRoute, meeting_controller_1.updateMeeting)
    .delete(middlewares_1.protectRoute, meeting_controller_1.deleteMeeting);
meetingRouter.route("/user/filter").get(middlewares_1.protectRoute, meeting_controller_1.filterMeetings);
exports.default = meetingRouter;
