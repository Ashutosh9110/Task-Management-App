import { prisma } from "../../config/prisma.js"
import { NotificationType } from "../../generated/prisma/index.js"

export class NotificationService {
  async createAssignmentNotification(
    userId: string,
    taskId: string
  ) {
    return prisma.notification.create({
      data: {
        type: NotificationType.TASK_ASSIGNED,
        message: "You have been assigned a new task",
        userId,
        taskId
      }
    })
  }
}
