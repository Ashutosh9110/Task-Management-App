import { createContext, useContext } from "react"
import { io, Socket } from "socket.io-client"

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true
})

const SocketContext = createContext<Socket>(socket)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
)

export const useSocket = () => useContext(SocketContext)
