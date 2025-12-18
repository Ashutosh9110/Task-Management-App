import { useMemo, useState } from "react"
import { useTasks } from "../hooks/useTasks"
import { useAuth } from "../../../hooks/useAuth"
import { TaskFilters } from "../components/TaskFilters"
import { useTaskSocket } from "../hooks/useTaskSocket"
import { TaskSection } from "../components/TaskSection"

export default function TaskDashboard() {
  // socket listener (side-effect only)
  useTaskSocket()

  const { data } = useTasks()
  const safeTasks = Array.isArray(data) ? data : []

  const { user } = useAuth()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState<"asc" | "desc">("asc")

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
    t =>
      new Date(t.dueDate) < now &&
      t.status !== "COMPLETED"
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        My Dashboard
      </h1>

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
    </div>
  )
}
