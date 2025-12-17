import { io } from "../../config/socket.js"
import type { Task } from "../../generated/prisma/index.js"

export const emitTaskUpdated = (task: Task) => {
  io.emit("task:updated", task)
}
