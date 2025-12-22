import { Server } from "socket.io"
import http from "http"
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js"
import { Socket } from "socket.io";

export let io: Server

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  })

  io.use(socketAuthMiddleware)

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId
    socket.join(userId)

    console.log(`User connected: ${userId}`)
  })
}
