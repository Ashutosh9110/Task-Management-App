import { useMemo, useState } from "react"
import { useTasks } from "../hooks/useTasks"
import { useAuth } from "../../../hooks/useAuth"
import { TaskCard } from "../components/TaskCard"
import { TaskFilters } from "../components/TaskFilters"
import { useTaskSocket } from "../hooks/useTaskSocket"

export default function TaskDashboard() {
  useTaskSocket()

  const { data: tasks = [] } = useTasks()
  const { user } = useAuth()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  const now = new Date()

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t =>
        status === "All" ? true : t.status === status
      )
      .filter(t =>
        priority === "All" ? true : t.priority === priority
      )
      .sort((a, b) =>
        sort === "asc"
          ? +new Date(a.dueDate) - +new Date(b.dueDate)
          : +new Date(b.dueDate) - +new Date(a.dueDate)
      )
  }, [tasks, status, priority, sort])

  const assignedToMe = filteredTasks.filter(
    t => t.assignedToId === user?.id
  )

  const createdByMe = filteredTasks.filter(
    t => t.creatorId === user?.id
  )

  const overdue = filteredTasks.filter(
    t =>
      new Date(t.dueDate) < now &&
      t.status !== "Completed"
  )

  const Section = ({
    title,
    tasks
  }: {
    title: string
    tasks: typeof filteredTasks
  }) => (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
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

      <Section title="Assigned to Me" tasks={assignedToMe} />
      <Section title="Created by Me" tasks={createdByMe} />
      <Section title="Overdue Tasks" tasks={overdue} />
    </div>
  )
}
