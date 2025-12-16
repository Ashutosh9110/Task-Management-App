import { prisma } from "../../config/prisma.js"

  export class TaskRepository {
    create(data) {
      return prisma.task.create({ data })
    }

    findByUser(userId: string) {
      return prisma.task.findMany({
        where: {
          OR: [
            { creatorId: userId },
            { assignedToId: userId }
          ]
        }
      })
    }
  }
