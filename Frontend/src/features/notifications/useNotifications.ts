import { useEffect, useState } from "react"
import { useSocket } from "../../context/SocketContext"
import { getNotifications } from "../../api/notification.api"

type Notification = {
  id: string
  type?: string
  message: string
  createdAt: string
  isRead: boolean
  taskId?: string
}


export const useNotifications = () => {
  const socket = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications()
        if (Array.isArray(data)) {
          setNotifications(data)
        } else {
          console.error("Notifications data is not an array:", data)
          setNotifications([])
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error)
      }
    }
    fetchNotifications()
  }, [])

  useEffect(() => {
    if (!socket) return
    const onNewNotification = (notification: Notification) => {
      setNotifications(prev => [notification, ...prev])
    }
    socket.on("notification:new", onNewNotification)
    return () => {
      socket.off("notification:new", onNewNotification)
    }
  }, [socket])

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  return {
    notifications,
    markAsRead,
    unreadCount: notifications.filter(n => !n.isRead).length
  }
}