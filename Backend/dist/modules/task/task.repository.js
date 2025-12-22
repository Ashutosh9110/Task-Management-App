import { prisma } from "../../config/prisma.js";
export class TaskRepository {
    create(data) {
        return prisma.task.create({ data });
    }
    findById(id) {
        return prisma.task.findUnique({ where: { id } });
    }
    findAllForUser(userId) {
        return prisma.task.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { assignedToId: userId }
                ]
            },
            orderBy: { dueDate: "asc" }
        });
    }
    update(id, data) {
        return prisma.task.update({
            where: { id },
            data
        });
    }
    delete(id) {
        return prisma.task.delete({ where: { id } });
    }
}
