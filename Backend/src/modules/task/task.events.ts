import { io } from "../../config/socket.js"
import type { Task } from "../../generated/prisma/index.js"

export const emitTaskUpdated = (task: Task) => {
  io.to(task.creatorId).emit("task:updated", task)

  if (task.assignedToId !== task.creatorId) {
    io.to(task.assignedToId).emit("task:updated", task)
  }
}
