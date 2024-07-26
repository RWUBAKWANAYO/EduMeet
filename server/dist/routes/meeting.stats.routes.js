"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const meeting_stats_controller_1 = require("../controllers/meeting.stats.controller");
const meetingStatsRouter = express_1.default.Router();
meetingStatsRouter.route("/count").get(middlewares_1.protectRoute, meeting_stats_controller_1.userMeetingStatsCount);
meetingStatsRouter.route("/filter").get(middlewares_1.protectRoute, meeting_stats_controller_1.fiterMeetingStats);
exports.default = meetingStatsRouter;
