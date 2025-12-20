import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { getMe, login as loginApi, register as registerApi, logout as logoutApi } from "../api/auth.api"

export type AuthUser = {
  id: string
  name: string
  name: string
  email: string
}

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      try {
        const me = await getMe()
        setUser(me) 
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])
  


  const login = async (email: string, password: string) => {
    await loginApi({ email, password })
    const me = await getMe()
    setUser(me)
  }

  const register = async (name: string, email: string, password: string) => {
    await registerApi({ name, email, password })
  }

  const logout = async () => {
    await logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
