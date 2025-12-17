import jwt from "jsonwebtoken"
import type { JwtPayload, SignOptions } from "jsonwebtoken"
import type ms from "ms"

const JWT_SECRET = process.env.JWT_SECRET!

export interface TokenPayload extends JwtPayload {
  userId: string
}

export const signToken = (payload: TokenPayload): string => {
  const options: SignOptions = {}

  if (process.env.JWT_EXPIRES_IN) {
    options.expiresIn = process.env.JWT_EXPIRES_IN as ms.StringValue
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}
