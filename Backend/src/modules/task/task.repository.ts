import { prisma } from "../../config/prisma.js"
import type { Prisma, Task } from "@prisma/client"

export class TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data })
  }

  findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } })
  }

  findAllForUser(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignedToId: userId }
        ]
      },
      orderBy: { dueDate: "asc" }
    })
  }

  update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data
    })
  }

  delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } })
  }
}
