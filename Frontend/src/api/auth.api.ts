import type { AuthUser } from "../context/AuthContext"
import axios from "./axios"


export async function login(data: { email: string; password: string }) {
  try {
    const res = await axios.post("/auth/login", data)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
    }
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed")
  }
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    const res = await axios.get("/auth/me")
    return res.data
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token")
      return null 
    }
    throw err
  }
}

export async function register(data: { name: string; email: string; password: string }) {
  try {
    const res = await axios.post("/auth/register", data)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
    }
    return res.data
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Registration failed")
  }
}



export async function logout() {
  try {
    await axios.post("/auth/logout")
  } finally {
    localStorage.removeItem("token")
  }
}
