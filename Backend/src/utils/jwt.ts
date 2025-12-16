import jwt, { JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export interface TokenPayload extends JwtPayload {
  userId: string
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}
