import { Router } from "express"
import { UserController } from "./user.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = Router()
const controller = new UserController()

router.get("/", authMiddleware, controller.getAllUsers)
router.put("/profile", authMiddleware, controller.updateProfile)

export default router
