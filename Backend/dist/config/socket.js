import { Server } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";
export let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    io.use(socketAuthMiddleware);
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        socket.join(userId);
        console.log(`User connected: ${userId}`);
    });
};
//# sourceMappingURL=socket.js.map