import type { Prisma, Task } from "../../generated/prisma/index.js";
export declare class TaskRepository {
    create(data: Prisma.TaskCreateInput): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findAllForUser(userId: string): Promise<Task[]>;
    update(id: string, data: Prisma.TaskUpdateInput): Promise<Task>;
    delete(id: string): Promise<Task>;
}
//# sourceMappingURL=task.repository.d.ts.map