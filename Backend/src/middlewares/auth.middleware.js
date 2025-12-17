import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.[process.env.COOKIE_NAME];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map