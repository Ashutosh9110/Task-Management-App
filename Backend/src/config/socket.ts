import { Server } from "socket.io"
import type { Server as HttpServer } from "http"
import jwt from "jsonwebtoken"
import { prisma } from "./prisma.js"

let io: Server

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true
    }
  })

  // Socket authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token
      if (!token) {
        return next(new Error("Authentication error"))
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
      const userId = decoded.id

      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return next(new Error("User not found"))
      }

      socket.data.userId = userId
      socket.join(`user:${userId}`)
      console.log(`Socket authenticated for user: ${userId}`)
      next()
    } catch (error) {
      console.error("Socket authentication error:", error)
      next(new Error("Authentication error"))
    }
  })

  io.on("connection", (socket) => {
    const userId = socket.data.userId
    console.log(`User ${userId} connected with socket ${socket.id}`)

    socket.join("tasks:all") 

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`)
    })
    socket.on("error", (error) => {
      console.error(`Socket error for user ${userId}:`, error)
    })
  })
  return io
}

export function emitToUser(userId: string, event: string, data: any) {
  io.to(`user:${userId}`).emit(event, data)
}
export function emitToAll(event: string, data: any) {
  io.emit(event, data)
}

export { io }