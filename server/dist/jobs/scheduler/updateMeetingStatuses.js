"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const meeting_model_1 = __importDefault(require("../../models/meeting.model"));
const updateMeetingStatuses = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    try {
        const ongoingUpdateResult = yield meeting_model_1.default.updateMany({ start_time: { $lte: now }, end_time: { $gt: now }, status: "upcoming" }, { status: "ongoing" });
        const endedUpdateResult = yield meeting_model_1.default.updateMany({ end_time: { $lte: now }, status: { $in: ["upcoming", "ongoing"] } }, { status: "ended" });
        console.log("Meeting statuses updated", {
            ongoingUpdated: ongoingUpdateResult.modifiedCount,
            endedUpdated: endedUpdateResult.modifiedCount,
        });
    }
    catch (error) {
        console.error("Error updating meeting statuses:", error);
    }
});
node_cron_1.default.schedule("* * * * *", updateMeetingStatuses);
exports.default = updateMeetingStatuses;
