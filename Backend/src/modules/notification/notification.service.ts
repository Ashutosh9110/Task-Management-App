import { prisma } from "../../config/prisma.js"
import { NotificationType } from "@prisma/client"
import type { Notification } from "@prisma/client"

export class NotificationService {
  async createAssignmentNotification(
    userId: string,
    taskId: string,
    taskTitle?: string
  ) {
    return prisma.notification.create({
      data: {
        type: NotificationType.TASK_ASSIGNED,
        message: `You have been assigned to task: ${taskTitle || "New Task"}`,
        userId,
        taskId
      }
    })
  }

  async createTaskUpdatedNotification(
    userId: string,
    taskId: string,
    taskTitle?: string
  ) {
    return prisma.notification.create({
      data: {
        type: NotificationType.TASK_UPDATED,
        message: `Task "${taskTitle || "A task"}" has been updated`,
        userId,
        taskId
      }
    })
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        task: {
          select: {
            title: true,
            status: true,
            priority: true
          }
        }
      }
    })
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification> {
    // First verify the notification belongs to the user
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId
      }
    })

    if (!notification) {
      throw new Error("Notification not found or not authorized")
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })
  }

  async markAllAsRead(userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    })
  }

  async getUnreadCount(userId: string): Promise<number> {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false
      }
    })
  }
}