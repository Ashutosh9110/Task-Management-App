import type { AuthUser } from "../context/AuthContext"
import axios from "./axios"

export async function getMe(): Promise<AuthUser> {
  const res = await axios.get("/auth/me")
  return res.data
}

export async function login(data: {
  email: string
  password: string
}) {
  await axios.post("/auth/login", data)
}

export async function register(data: {
  name: string
  email: string
  password: string  
}) {
  await axios.post("/auth/register", data)
}

export async function logout() {
  await axios.post("/auth/logout")
}
