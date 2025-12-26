import { createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useAuth } from "../hooks/useAuth"

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
      return
    }

    const newSocket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      withCredentials: true,
      transports: ["websocket", "polling"]
    })

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id)
    })

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
    })

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [isAuthenticated, token])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const socket = useContext(SocketContext)
  if (!socket) {
    return null
  }
  return socket
}