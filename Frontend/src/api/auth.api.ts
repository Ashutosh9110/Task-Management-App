import type { AuthUser } from "../context/AuthContext"
import axios from "./axios"

export async function getMe(): Promise<AuthUser | null> {
  try {
    const res = await axios.get("/auth/me")
    return res.data
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null 
    }
    throw err
  }
}

export async function login(data: {
  email: string
  password: string
}) {
  try {
    await axios.post("/auth/login", data)
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed")
  }
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
