import { io } from "../../config/socket.js";
export const emitTaskUpdated = (task) => {
    io.to(task.creatorId).emit("task:updated", task);
    if (task.assignedToId !== task.creatorId) {
        io.to(task.assignedToId).emit("task:updated", task);
    }
};
