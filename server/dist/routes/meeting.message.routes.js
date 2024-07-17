"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const meeting_message_controller_1 = require("../controllers/meeting.message.controller");
const express_1 = __importDefault(require("express"));
const meetingMessageRouter = express_1.default.Router();
meetingMessageRouter.route("/count").get(middlewares_1.protectRoute, meeting_message_controller_1.countUserMessages);
exports.default = meetingMessageRouter;
