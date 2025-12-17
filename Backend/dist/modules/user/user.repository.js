import { prisma } from "../../config/prisma.js";
export class UserRepository {
    updateName(userId, name) {
        return prisma.user.update({
            where: { id: userId },
            data: { name }
        });
    }
}
//# sourceMappingURL=user.repository.js.map