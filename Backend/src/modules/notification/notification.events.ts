import { emitToUser } from "../../config/socket.js"
import type { Notification } from "@prisma/client"

export function emitNotification(userId: string, notification: Notification) {
  emitToUser(userId, "notification:new", notification)
}