import { Router } from "express";
import { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = Router();
const controller = new TaskController();
router.use(authMiddleware);
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
export default router;
//# sourceMappingURL=task.routes.js.map