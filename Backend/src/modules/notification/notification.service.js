import { prisma } from "../../config/prisma.js";
import { NotificationType } from "../../generated/prisma/index.js";
export class NotificationService {
    async createAssignmentNotification(userId, taskId) {
        return prisma.notification.create({
            data: {
                type: NotificationType.TASK_ASSIGNED,
                message: "You have been assigned a new task",
                userId,
                taskId
            }
        });
    }
}
//# sourceMappingURL=notification.service.js.map