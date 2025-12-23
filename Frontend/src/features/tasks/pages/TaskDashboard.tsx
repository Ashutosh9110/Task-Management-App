import { useEffect, useMemo, useState } from "react"
import { useTasks } from "../hooks/useTasks"
import { useAuth } from "../../../hooks/useAuth"
import { TaskFilters } from "../components/TaskFilters"
import { useTaskSocket } from "../hooks/useTaskSocket"
import { TaskSection } from "../components/TaskSection"
import { TaskForm } from "../components/TaskForm"
import { DashboardLayout } from "../../../components/layout/DashboardLayout"

export default function TaskDashboard() {
  useTaskSocket()

  const { data, isLoading } = useTasks()
  const safeTasks = Array.isArray(data) ? data : []

  const { user, logout } = useAuth()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  const [showCreate, setShowCreate] = useState(false)

  const now = new Date()

  const filteredTasks = useMemo(() => {
    // Map display status to enum values
    const statusMap: Record<string, string> = {
      "All": "All",
      "To Do": "TODO",
      "In Progress": "IN_PROGRESS",
      "Review": "REVIEW", // Note: You don't have "REVIEW" in your TaskStatus enum
      "Completed": "COMPLETED"
    };
    
    // Map display priority to enum values
    const priorityMap: Record<string, string> = {
      "All": "All",
      "Low": "LOW",
      "Medium": "MEDIUM",
      "High": "HIGH",
      "Urgent": "URGENT" // Note: You don't have "URGENT" in your TaskPriority enum
    };
  
    return safeTasks
      .filter(t => status === "All" || t.status === statusMap[status])
      .filter(t => priority === "All" || t.priority === priorityMap[priority])
      .sort((a, b) =>
        sort === "asc"
          ? +new Date(a.dueDate) - +new Date(b.dueDate)
          : +new Date(b.dueDate) - +new Date(a.dueDate)
      )
  }, [safeTasks, status, priority, sort])

  const assignedToMe = filteredTasks.filter(
    t => t.assignedToId === user?.id
  )

  const createdByMe = filteredTasks.filter(
    t => t.creatorId === user?.id
  )

  const overdue = filteredTasks.filter(
    t => new Date(t.dueDate) < now && t.status !== "COMPLETED"
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCreate(false)
      }
    }
    if (showCreate) {
      window.addEventListener("keydown", handler)
    }
    return () => window.removeEventListener("keydown", handler)
   }, [showCreate])

  return (
    <DashboardLayout title="My Dashboard">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer"
          >
            + Create Task
          </button>
          <button
            onClick={() => logout()}
            className="px-4 py-2 rounded-md border border-white/20 text-white hover:bg-white/10 transition cursor-pointer">
            Logout
          </button>
        </div>
        </div>

        <TaskFilters
          status={status}
          priority={priority}
          sort={sort}
          setStatus={setStatus}
          setPriority={setPriority}
          setSort={setSort}
        />
        <hr className="my-6 border-gray-200" />

        <TaskSection title="Assigned to Me" tasks={assignedToMe} isLoading={isLoading} />
        <TaskSection title="Created by Me" tasks={createdByMe} />
        <TaskSection title="Overdue Tasks" tasks={overdue} />

        {showCreate && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowCreate(false)}
              >
              <div
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 shadow-2xl"
                  onClick={(e) => e.stopPropagation()} 
                >
              <TaskForm onSuccess={() => setShowCreate(false)} />
              <button
                onClick={() => setShowCreate(false)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
