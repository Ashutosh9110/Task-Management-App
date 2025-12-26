import type { Request, Response } from "express"
import { NotificationService } from "./notification.service.js"

const service = new NotificationService()

export class NotificationController {
  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const notifications = await service.getUserNotifications(userId)
      res.status(200).json(notifications || [])
    } catch (error) {
      console.error("Error fetching notifications:", error)
      res.status(500).json({ message: "Failed to fetch notifications" })
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userId = req.user!.id
      
      if (!id) {
        res.status(400).json({ message: "Notification ID is required" })
        return
      }

      const notification = await service.markAsRead(id, userId)
      res.status(200).json(notification)
    } catch (error: any) {
      if (error.message === "Notification not found" || error.message === "Not authorized") {
        res.status(404).json({ message: error.message })
      } else {
        res.status(500).json({ message: "Failed to mark notification as read" })
      }
    }
  }
}