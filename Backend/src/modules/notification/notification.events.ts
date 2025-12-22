import { io } from "../../config/socket.js"
import type { Notification } from "@prisma/client"

export const emitNotification = (
  userId: string,
  notification: Notification
) => {
  io.to(userId).emit("notification:new", notification)
}
