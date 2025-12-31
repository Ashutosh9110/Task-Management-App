  import { Router } from "express"
  import authRoutes from "../modules/auth/auth.routes.js"
  import userRoutes from "../modules/user/user.routes.js"
  import taskRoutes from "../modules/task/task.routes.js"
  import { authMiddleware } from "../middlewares/auth.middleware.js"
  import notificationRoutes from "../modules/notification/notification.routes.js"

  const router = Router()

  router.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'task-management-backend'
    })
  })

  router.use("/auth", authRoutes)
  router.use("/users", authMiddleware, userRoutes)
  router.use("/tasks", authMiddleware, taskRoutes)
  router.use("/notifications", authMiddleware, notificationRoutes)

  export default router
