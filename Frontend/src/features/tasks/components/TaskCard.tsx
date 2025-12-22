import type { Task } from "../task.types"
import clsx from "clsx"

const priorityColor: Record<string, string> = {
  Low: "bg-green-500/20 text-green-300",
  Medium: "bg-yellow-500/20 text-yellow-300",
  High: "bg-orange-500/20 text-orange-300",
  Urgent: "bg-red-500/20 text-red-300"
}

export function TaskCard({ task }: { task: Task }) {
  const isOverdue =
    new Date(task.dueDate) < new Date() &&
    task.status !== "COMPLETED"

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base text-white">{task.title}</h3>
        <span
          className={clsx(
            "px-2 py-1 text-xs rounded-full font-medium",
            priorityColor[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4 text-xs">
        <span
          className={clsx(
            "px-2 py-1 rounded-md",
            isOverdue
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-600"
          )}
        >
          {new Date(task.dueDate).toLocaleDateString()}
        </span>

        <span className="text-gray-400">{task.status}</span>
      </div>
    </div>
  )
}
