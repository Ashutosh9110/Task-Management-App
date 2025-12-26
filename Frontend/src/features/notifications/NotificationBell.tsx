import { useState } from "react"
import { Bell } from "lucide-react"
import { useNotifications } from "./useNotifications"

export default function NotificationBell() {
  const { notifications, unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)

  // const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative p-2 rounded-full hover:text-red-500 transition-colors   cursor-pointer"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-3 font-semibold border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs font-normal bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-700">
              <Bell size={24} className="mx-auto mb-2 text-gray-700" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-auto">
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 mb-1">
                          {notification.message}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {!notification.isRead && (
                            <span className="text-xs text-blue-600 font-medium">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
