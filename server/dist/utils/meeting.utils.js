"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingStatus = void 0;
const moment_1 = __importDefault(require("moment"));
const getMeetingStatus = (startTime, endTime) => {
    const now = (0, moment_1.default)();
    const startMoment = (0, moment_1.default)(startTime);
    const endMoment = (0, moment_1.default)(endTime);
    if (now.isBefore(startMoment)) {
        return "upcoming";
    }
    else if (now.isBetween(startMoment, endMoment)) {
        return "ongoing";
    }
    else {
        return "ended";
    }
};
exports.getMeetingStatus = getMeetingStatus;
