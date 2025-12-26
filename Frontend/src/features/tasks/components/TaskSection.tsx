import { TaskCard } from "./TaskCard"
import type { Task } from "../task.types"

interface TaskSectionProps {
  title: string
  tasks: Task[]
  isLoading?: boolean
}

export function TaskSection({ title, tasks, isLoading }: TaskSectionProps) {
  if (isLoading) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-800/50 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </section>
    )
  }

  if (tasks.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="text-gray-400 italic p-6 bg-gray-900/30 rounded-xl border border-white/5">
          No tasks found in this section
        </div>
      </section>
    )
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}