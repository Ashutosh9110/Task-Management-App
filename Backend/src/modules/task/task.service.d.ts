import type { Task } from "../../generated/prisma/index.js";
export declare class TaskService {
    createTask(input: {
        title: string;
        description: string;
        dueDate: string;
        priority: any;
        status?: any;
        creatorId: string;
        assignedToId: string;
    }): Promise<Task>;
    getTasksForUser(userId: string): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    updateTask(taskId: string, userId: string, data: any): Promise<{
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        dueDate: Date;
        priority: import("../../generated/prisma/index.js").$Enums.TaskPriority;
        status: import("../../generated/prisma/index.js").$Enums.TaskStatus;
        creatorId: string;
        assignedToId: string;
    }>;
    deleteTask(taskId: string, userId: string): Promise<void>;
}
//# sourceMappingURL=task.service.d.ts.map