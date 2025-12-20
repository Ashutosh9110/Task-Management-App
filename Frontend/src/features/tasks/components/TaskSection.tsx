import { TaskSkeleton } from "../../../components/ui/TaskSkeleton"
import type { Task } from "../task.types"
import { TaskCard } from "./TaskCard"

interface Props {
  title: string
  tasks: Task[]
}

export function TaskSection({ title, tasks, isLoading }: Props & { isLoading?: boolean }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-400">No tasks</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
