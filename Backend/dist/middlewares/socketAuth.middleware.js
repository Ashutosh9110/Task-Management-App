import { verifyToken } from "../utils/jwt.js";
export const socketAuthMiddleware = (c, next) => {
    try {
        const cookieHeader = c.handshake.headers.cookie;
        const token = cookieHeader
            ?.split("; ")
            .find((cookie) => cookie.startsWith(`${process.env.COOKIE_NAME}=`))
            ?.split("=")[1];
        if (!token) {
            return next(new Error("Unauthorized"));
        }
        const payload = verifyToken(token);
        c.data.userId = payload.userId;
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        next(new Error("Unauthorized"));
    }
};
