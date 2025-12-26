import { emitToAll, emitToUser } from "../../config/socket.js"
import type { Task } from "@prisma/client"

export function emitTaskCreated(task: Task) {
  emitToAll("task:created", task)
  
  emitToUser(task.creatorId, "task:created:owner", task)

  if (task.assignedToId && task.creatorId !== task.assignedToId) {
    emitToUser(task.assignedToId, "task:created:assignee", task)
  }
}

export function emitTaskUpdated(task: Task) {
  emitToAll("task:updated", task)
  
  emitToUser(task.creatorId, "task:updated:owner", task)
  
  if (task.assignedToId && task.creatorId !== task.assignedToId) {
    emitToUser(task.assignedToId, "task:updated:assignee", task)
  }
}

export function emitTaskDeleted(taskId: string) {
  emitToAll("task:deleted", taskId)
}