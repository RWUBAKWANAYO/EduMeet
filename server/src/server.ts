import app from "./app";
import http from "http";
import "dotenv/config";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import connectMongoDB from "./config/mongodb";
import { globalErrorHandler } from "./middlewares";
import { ErrorFormat } from "./utils";
import { NextFunction, Request, Response } from "express";
import { meetingRoomHandler } from "./services/socket/meeting.room";
import { userSocketHandler } from "./services/socket/user";

const server = http.createServer(app);

connectMongoDB(process.env.MONGODB_URL || "");

const peerServer = ExpressPeerServer(server, { path: "/" });

app.use("/peerjs", peerServer);

const io = new Server(server, {
	cors: { origin: "*" },
});

io.on("connection", (socket) => {
	meetingRoomHandler(io, socket);
	userSocketHandler(io, socket);
});
const PORT = process.env.PORT || 8080;

app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
	const err = new ErrorFormat(`Can't find ${_req.originalUrl} on this server!`, 404);
	next(err);
});

app.use(globalErrorHandler);

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
