import { useEffect, useState } from "react"
import { useSocket } from "../../context/SocketContext"

type Notification = {
  id: string
  message: string
  createdAt: string
  read: boolean
}
export const useNotifications = () => {

  
  const socket = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    socket.on("notification:new", (notification) => {
      setNotifications(prev => [notification, ...prev])
    })

    return () => {
      socket.off("notification:new")
    }
  }, [socket])

  return notifications
}
