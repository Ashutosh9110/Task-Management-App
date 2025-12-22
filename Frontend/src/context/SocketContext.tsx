import { createContext, useEffect, useState, useContext } from "react"
import { io, Socket } from "socket.io-client"
import { useAuth } from "../hooks/useAuth"


export const SocketContext = createContext<Socket | null>(null)

export function useSocket() {
  const socket = useContext(SocketContext)
  if (!socket) {
    throw new Error("useSocket must be used within SocketProvider")
  }
  return socket
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!isAuthenticated) return

    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    })
    // newSocket.connect() 
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
