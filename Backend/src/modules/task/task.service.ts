import { TaskRepository } from "./task.repository.js"
import type { Task } from "@prisma/client"
import { emitTaskCreated, emitTaskUpdated, emitTaskDeleted } from "./task.events.js"
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
    const task = await repo.create({
      title: input.title,
      description: input.description ?? "",
      dueDate: new Date(input.dueDate),
      priority: input.priority,
      status: input.status,
      creator: { connect: { id: input.creatorId } },
      assignedTo: { connect: { id: input.assignedToId } }
    })
    emitTaskCreated(task)
    if (input.creatorId !== input.assignedToId) {
      const notification = await notificationService.createAssignmentNotification(
        input.assignedToId,
        task.id,
        input.title
      )
      emitNotification(input.assignedToId, notification)
    }
    return task
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await repo.findById(id)
    if (!task) {
      throw new Error("Task not found")
    }
    return task
  }

  async getTasksForUser(userId: string): Promise<Task[]> {
    return repo.findAllForUser(userId)
  }

  async updateTask(taskId: string, userId: string, data: any) {
    const task = await this.getTaskById(taskId)
    
    if (task.creatorId !== userId) {
      throw new Error("Not authorized to update this task")
    }
    const updatedTask = await repo.update(taskId, data)
    emitTaskUpdated(updatedTask)

    if (data.assignedToId && data.assignedToId !== task.assignedToId) {
      const notification = await notificationService.createAssignmentNotification(
        data.assignedToId,
        taskId,
        updatedTask.title
      )
      emitNotification(data.assignedToId, notification)
    }
    else if (data.assignedToId && task.assignedToId === data.assignedToId) {
      const notification = await notificationService.createTaskUpdatedNotification(
        data.assignedToId,
        taskId,
        updatedTask.title
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
