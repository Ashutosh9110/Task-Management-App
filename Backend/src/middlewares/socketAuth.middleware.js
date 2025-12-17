import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt.js";
export const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find(c => c.startsWith(`${process.env.COOKIE_NAME}=`))
        ?.split("=")[1];
    if (!token)
        return next(new Error("Unauthorized"));
    try {
        const payload = verifyToken(token);
        socket.data.userId = payload.userId;
        next();
    }
    catch {
        next(new Error("Unauthorized"));
    }
};
//# sourceMappingURL=socketAuth.middleware.js.map