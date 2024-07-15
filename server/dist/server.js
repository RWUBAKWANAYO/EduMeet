"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const socket_io_1 = require("socket.io");
const peer_1 = require("peer");
const mongodb_1 = __importDefault(require("./config/mongodb"));
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const meeting_room_1 = require("./services/socket/meeting.room");
const user_1 = require("./services/socket/user");
const server = http_1.default.createServer(app_1.default);
(0, mongodb_1.default)(process.env.MONGODB_URL || "");
const peerServer = (0, peer_1.ExpressPeerServer)(server, { path: "/" });
app_1.default.use("/peerjs", peerServer);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
io.on("connection", (socket) => {
    console.log("Client connected");
    (0, meeting_room_1.meetingRoomHandler)(io, socket);
    (0, user_1.userSocketHandler)(io, socket);
});
const PORT = process.env.PORT || 8080;
app_1.default.use("*", (_req, _res, next) => {
    const err = new utils_1.ErrorFormat(`Can't find ${_req.originalUrl} on this server!`, 404);
    next(err);
});
app_1.default.use(middlewares_1.globalErrorHandler);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
