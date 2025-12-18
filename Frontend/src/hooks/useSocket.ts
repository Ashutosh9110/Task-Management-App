import { useContext } from "react"
import { SocketContext } from "../context/SocketContext.js"

export function useSocket() {
  const socket = useContext(SocketContext)

  if (!socket) {
    throw new Error("useSocket must be used within SocketProvider")
  }

  return socket
}
