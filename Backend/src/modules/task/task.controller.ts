  import type { Request, Response } from "express"
  import { TaskService } from "./task.service.js"
  import { createTaskSchema, updateTaskSchema } from "./task.schema.js"

  const service = new TaskService()

  export class TaskController {
    async create(req: Request, res: Response) {
      const data = createTaskSchema.parse(req.body)

      const task = await service.createTask({
        title: data.title,
        description: data.description ?? "",
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status ?? "TODO",
        assignedToId: data.assignedToId,
        creatorId: req.user!.id
      })

      res.status(201).json(task)
    }

    async getAll(req: Request, res: Response) {
      const tasks = await service.getTasksForUser(req.user!.id)
      res.status(200).json(tasks)
    }

    async getById(req: Request, res: Response) {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: "Task ID is required" }) 
        return
      }
      const task = await service.getTaskById(id)
      res.status(200).json(task)
    }
    

    async update(req: Request, res: Response) {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: "Task ID is required" })
        return
      }
      const data = updateTaskSchema.parse(req.body)
      const task = await service.updateTask(
        id,
        req.user!.id,
        data
      )

      res.status(200).json(task)
    }

    async delete(req: Request, res: Response) {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: "Task ID is required" })
        return
      }
      await service.deleteTask(id, req.user!.id)
      res.status(204).send()
    }
  }
