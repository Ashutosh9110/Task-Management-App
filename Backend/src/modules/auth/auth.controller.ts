import type { Request, Response } from "express"
import { registerSchema, loginSchema } from "./auth.schema.js"
import { AuthService } from "./auth.service.js"
import { COOKIE_NAME } from "./auth.config.js"
import { prisma } from "../../config/prisma.js"
import { signToken } from "../../utils/jwt.js"
import axios from 'axios'

const service = new AuthService()


const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" as const : "lax" as const,
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


  async githubRedirect(req: Request, res: Response) {
    const url =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.GITHUB_CLIENT_ID}` +
      `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
      `&scope=user:email`

    res.redirect(url)
  }

  async githubCallback(req: Request, res: Response) {
    const { code } = req.query

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: "application/json" } }
    )

    const accessToken = tokenRes.data.access_token

    const { data: githubUser } = await axios.get(
      "https://api.github.com/user",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    const emailRes = await axios.get(
      "https://api.github.com/user/emails",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    type GitHubEmail = {
      email: string
      primary: boolean
      verified: boolean
      visibility: string | null
    }
    
    const emails: GitHubEmail[] = emailRes.data
    
    const primaryEmail = emails.find((e: GitHubEmail) => e.primary)?.email
    if (!primaryEmail) {
      return res.status(400).json({ message: "GitHub account has no primary email" })
    }
    let user = await prisma.user.findUnique({
      where: { email: primaryEmail }
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: primaryEmail,
          name: githubUser.name || githubUser.login,
          githubId: githubUser.id.toString()
        }
      })
    }

    const token = signToken({ userId: user.id })

    res
      .cookie(COOKIE_NAME, token, cookieOptions)
      .redirect(`${process.env.FRONTEND_URL}/app`)
  }
  
}
