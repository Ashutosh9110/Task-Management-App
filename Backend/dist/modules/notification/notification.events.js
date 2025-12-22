import { io } from "../../config/socket.js";
export const emitNotification = (userId, notification) => {
    io.to(userId).emit("notification:new", notification);
};
