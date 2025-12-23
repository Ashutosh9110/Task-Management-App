import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.js"
import { prisma } from "../config/prisma.js"
import { COOKIE_NAME } from "../modules/auth/auth.config.js"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Cookies:", req.cookies)
  // console.log("Token:", req.cookies?.[process.env.COOKIE_NAME!])

  const token = req.cookies?.[COOKIE_NAME]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const payload = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}
