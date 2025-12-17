import { useEffect, useState } from "react"
import { useSocket } from "../../context/SocketContext"

export const useNotifications = () => {
  const socket = useSocket()
  const [notifications, setNotifications] = useState<any[]>([])

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
