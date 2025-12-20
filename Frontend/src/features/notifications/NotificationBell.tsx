import { useState } from "react"
import { Bell } from "lucide-react"
import { useNotifications } from "./useNotifications"

export default function NotificationBell() {
  const notifications = useNotifications()
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-3 font-semibold border-b">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            <ul className="max-h-80 overflow-auto">
              {notifications.map((n, idx) => (
                <li
                  key={idx}
                  className="p-3 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <p className="text-sm">{n.message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
