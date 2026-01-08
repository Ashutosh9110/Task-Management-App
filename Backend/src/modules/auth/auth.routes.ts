import { Router } from "express"
import { AuthController } from "./auth.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = Router()
const controller = new AuthController()

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.get("/me", authMiddleware, controller.me)

router.get("/github", controller.githubRedirect)
router.get("/github/callback", controller.githubCallback)


export default router
