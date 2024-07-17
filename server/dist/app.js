"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const meeting_routes_1 = __importDefault(require("./routes/meeting.routes"));
const meeting_room_routes_1 = __importDefault(require("./routes/meeting.room.routes"));
const meeting_message_routes_1 = __importDefault(require("./routes/meeting.message.routes"));
const invitation_routes_1 = __importDefault(require("./routes/invitation.routes"));
const updateMeetingStatuses_1 = __importDefault(require("./jobs/scheduler/updateMeetingStatuses"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/meetings", meeting_routes_1.default);
app.use("/api/v1/meeting-rooms", meeting_room_routes_1.default);
app.use("/api/v1/meeting-messages", meeting_message_routes_1.default);
app.use("/api/v1/invitations", invitation_routes_1.default);
//jobs
(0, updateMeetingStatuses_1.default)();
exports.default = app;
