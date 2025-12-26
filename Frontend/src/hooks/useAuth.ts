import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"


export interface AuthContextType {
  user: {
    id: string
    email: string
    name: string
    token?: string 
  } | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}


export function useAuth() {
  const context  = useContext(AuthContext)

  if (!context ) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context 
}
