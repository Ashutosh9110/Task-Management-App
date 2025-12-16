import { AuthRepository } from "./auth.repository"
import { hashPassword, comparePassword } from "../../utils/password"
import { signToken } from "../../utils/jwt"
import { User } from "@prisma/client"

const repo = new AuthRepository()

export class AuthService {
  async register(data: {
    name: string
    email: string
    password: string
  }): Promise<{ user: User; token: string }> {
    const existingUser = await repo.findByEmail(data.email)
    if (existingUser) {
      throw new Error("Email already in use")
    }

    const hashedPassword = await hashPassword(data.password)

    const user = await repo.createUser({
      ...data,
      password: hashedPassword
    })

    const token = signToken({ userId: user.id })

    return { user, token }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user = await repo.findByEmail(email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      throw new Error("Invalid credentials")
    }

    const token = signToken({ userId: user.id })

    return { user, token }
  }
}
