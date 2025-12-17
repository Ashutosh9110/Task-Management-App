import { TaskRepository } from "./task.repository.js";
import { emitTaskUpdated } from "./task.events.js";
import { NotificationService } from "../notification/notification.service.js";
import { emitNotification } from "../notification/notification.events.js";
const notificationService = new NotificationService();
const repo = new TaskRepository();
export class TaskService {
    async createTask(input) {
        return repo.create({
            title: input.title,
            description: input.description ?? "",
            dueDate: new Date(input.dueDate),
            priority: input.priority,
            status: input.status,
            creator: { connect: { id: input.creatorId } },
            assignedTo: { connect: { id: input.assignedToId } }
        });
    }
    async getTasksForUser(userId) {
        return repo.findAllForUser(userId);
    }
    async getTaskById(id) {
        const task = await repo.findById(id);
        if (!task)
            throw new Error("Task not found");
        return task;
    }
    async updateTask(taskId, userId, data) {
        const task = await this.getTaskById(taskId);
        if (task.creatorId !== userId) {
            throw new Error("Not authorized");
        }
        const updatedTask = await repo.update(taskId, data);
        emitTaskUpdated(updatedTask);
        if (data.assignedToId &&
            data.assignedToId !== task.assignedToId) {
            const notification = await notificationService.createAssignmentNotification(data.assignedToId, taskId);
            emitNotification(data.assignedToId, notification);
        }
        return updatedTask;
    }
    async deleteTask(taskId, userId) {
        const task = await this.getTaskById(taskId);
        if (task.creatorId !== userId) {
            throw new Error("Not authorized to delete this task");
        }
        await repo.delete(taskId);
    }
}
//# sourceMappingURL=task.service.js.map