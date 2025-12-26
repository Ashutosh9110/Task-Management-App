import { Router } from "express"
import { NotificationController } from "./notification.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = Router()
const controller = new NotificationController()

router.get("/", authMiddleware, controller.getUserNotifications)
router.patch("/:id/read", authMiddleware, controller.markAsRead)

export default router