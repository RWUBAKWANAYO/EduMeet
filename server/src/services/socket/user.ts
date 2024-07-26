import { Server, Socket } from "socket.io";

export const userSocketHandler = (_io: Server, socket: Socket) => {
  const joinUserSocket = async (userId: string) => {
    socket.join(userId);
  };

  socket.on("join-user-to-socket", joinUserSocket);
};
