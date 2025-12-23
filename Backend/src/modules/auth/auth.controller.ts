import type { Request, Response } from "express"
import { registerSchema, loginSchema } from "./auth.schema.js"
import { AuthService } from "./auth.service.js"
import { COOKIE_NAME } from "./auth.config.js"

const service = new AuthService()


const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000
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
    // console.time("auth")
    const data = loginSchema.parse(req.body)
    const { user, token } = await service.login(data.email, data.password)
    res.cookie(COOKIE_NAME, token, cookieOptions)
    res.status(200).json({ user })
    // console.timeEnd("auth")
  }

  logout(_: Request, res: Response): void {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    })
    res.status(200).json({ message: "Logged out successfully" })
  }

  me(req: Request, res: Response): void {
    // console.log("Cookies received:", req.cookies)
    res.status(200).json(req.user)
  }
  
}
