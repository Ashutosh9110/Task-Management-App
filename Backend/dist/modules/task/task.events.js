import { io } from "../../config/socket.js";
export const emitTaskUpdated = (task) => {
    io.emit("task:updated", task);
};
//# sourceMappingURL=task.events.js.map