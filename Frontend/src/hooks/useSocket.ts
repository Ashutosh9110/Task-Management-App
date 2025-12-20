import { useContext } from "react"
import { SocketContext } from "../context/SocketContext.js"
  
export function useSocket() {
  return useContext(SocketContext)
}
