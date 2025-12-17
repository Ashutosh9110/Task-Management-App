import { TaskRepository } from "./task.repository.js"
import type { Task } from "../../generated/prisma/index.js"
import { emitTaskUpdated } from "./task.events.js"
import { NotificationService } from "../notification/notification.service.js"
import { emitNotification } from "../notification/notification.events.js"

const notificationService = new NotificationService()

const repo = new TaskRepository()

export class TaskService {
  async createTask(input: {
    title: string
    description: string
    dueDate: string
    priority: any
    status?: any
    creatorId: string
    assignedToId: string
  }): Promise<Task> {
    return repo.create({
      title: input.title,
      description: input.description ?? "",
      dueDate: new Date(input.dueDate),
      priority: input.priority,
      status: input.status,
      creator: { connect: { id: input.creatorId } },
      assignedTo: { connect: { id: input.assignedToId } }
    })
  }

  async getTasksForUser(userId: string): Promise<Task[]> {
    return repo.findAllForUser(userId)
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await repo.findById(id)
    if (!task) throw new Error("Task not found")
    return task
  }

  async updateTask(taskId: string, userId: string, data: any) {
    const task = await this.getTaskById(taskId)
    if (task.creatorId !== userId) {
      throw new Error("Not authorized")
    }
    const updatedTask = await repo.update(taskId, data)
    emitTaskUpdated(updatedTask)
    if (
      data.assignedToId &&
      data.assignedToId !== task.assignedToId
    ) {
      const notification =
        await notificationService.createAssignmentNotification(
          data.assignedToId,
          taskId
        )
      emitNotification(data.assignedToId, notification)
    }
    return updatedTask
  }
  

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await this.getTaskById(taskId)

    if (task.creatorId !== userId) {
      throw new Error("Not authorized to delete this task")
    }

    await repo.delete(taskId)
  }
}
