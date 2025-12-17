export declare class NotificationService {
    createAssignmentNotification(userId: string, taskId: string): Promise<{
        userId: string;
        message: string;
        id: string;
        createdAt: Date;
        type: import("../../generated/prisma/index.js").$Enums.NotificationType;
        isRead: boolean;
        taskId: string | null;
    }>;
}
//# sourceMappingURL=notification.service.d.ts.map