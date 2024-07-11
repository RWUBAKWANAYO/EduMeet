import socketIOClient from "socket.io-client";
export const socket = socketIOClient(process.env.REACT_APP_SERVER_HOST as string);
