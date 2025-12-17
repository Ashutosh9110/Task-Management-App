import { prisma } from "../../config/prisma.js";
export class AuthRepository {
    findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    createUser(data) {
        return prisma.user.create({ data });
    }
}
//# sourceMappingURL=auth.repository.js.map