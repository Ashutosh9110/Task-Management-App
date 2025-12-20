import type { Request, Response } from "express"
import { registerSchema, loginSchema } from "./auth.schema.js"
import { AuthService } from "./auth.service.js"

const service = new AuthService()

const COOKIE_NAME = process.env.COOKIE_NAME!

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const
}

export class AuthController {

  async register(req: Request, res: Response): Promise<void> {
    console.log("Raw body: ", req.body);
    const data = registerSchema.parse(req.body)
    const { user, token } = await service.register(data)
    res.cookie(COOKIE_NAME, token, cookieOptions)
    res.status(201).json({ user })
  }


  async login(req: Request, res: Response): Promise<void> {
    const data = loginSchema.parse(req.body)
    const { user, token } = await service.login(data.email, data.password)
    res.cookie(COOKIE_NAME, token, cookieOptions)
    res.status(200).json({ user })
  }

  logout(_: Request, res: Response): void {
    res.clearCookie(COOKIE_NAME)
    res.status(200).json({ message: "Logged out successfully" })
  }

  me(req: Request, res: Response): void {
    res.status(200).json(req.user)
  }
  
  
}
