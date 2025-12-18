import { useMemo, useState } from "react"
import { useTasks } from "../hooks/useTasks"
import { useAuth } from "../../../hooks/useAuth"
import { TaskFilters } from "../components/TaskFilters"
import { useTaskSocket } from "../hooks/useTaskSocket"
import { TaskSection } from "../components/TaskSection"
import { TaskForm } from "../components/TaskForm"

export default function TaskDashboard() {
  useTaskSocket()

  const { data } = useTasks()
  const safeTasks = Array.isArray(data) ? data : []

  const { user } = useAuth()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  const [showCreate, setShowCreate] = useState(false)

  const now = new Date()

  const filteredTasks = useMemo(() => {
    return safeTasks
      .filter(t => status === "All" || t.status === status)
      .filter(t => priority === "All" || t.priority === priority)
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          + Create Task
        </button>
      </div>

      <TaskFilters
        status={status}
        priority={priority}
        sort={sort}
        setStatus={setStatus}
        setPriority={setPriority}
        setSort={setSort}
      />

      <TaskSection title="Assigned to Me" tasks={assignedToMe} />
      <TaskSection title="Created by Me" tasks={createdByMe} />
      <TaskSection title="Overdue Tasks" tasks={overdue} />

      {/* Create Task Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <TaskForm onSuccess={() => setShowCreate(false)} />
            <button
              onClick={() => setShowCreate(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
