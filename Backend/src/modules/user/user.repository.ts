import { prisma } from "../../config/prisma.js"

export class UserRepository {
  updateName(userId: string, name: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { name }
    })
  }
}
