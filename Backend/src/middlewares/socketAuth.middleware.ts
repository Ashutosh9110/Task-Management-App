import { Socket } from "socket.io"
import cookie from "cookie"
import { verifyToken } from "../utils/jwt.js"

interface JwtPayload { userId: string }

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const rawCookie = socket.handshake.headers.cookie
    if (!rawCookie) {
      return next(new Error("Unauthorized"))
    }

    const cookies = cookie.parse(rawCookie)
    const token = cookies[process.env.COOKIE_NAME as string]

    if (!token) {
      return next(new Error("Unauthorized"))
    }

    const payload = verifyToken(token) as JwtPayload
    socket.data.userId = payload.userId

    next()
  } catch (err) {
    next(new Error("Unauthorized"))
  }
}
