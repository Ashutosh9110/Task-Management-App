import { prisma } from "../../config/prisma.js"
import type { User } from "@prisma/client"


export class AuthRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  createUser(data: {
    name: string
    email: string
    password: string
  }): Promise<User> {
    return prisma.user.create({ data })
  }
}
