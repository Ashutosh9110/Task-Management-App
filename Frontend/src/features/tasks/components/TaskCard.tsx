import type { Task } from "../task.types"
import clsx from "clsx"

const priorityColor: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700"
}

export function TaskCard({ task }: { task: Task }) {
  const isOverdue =
    new Date(task.dueDate) < new Date() &&
    task.status !== "Completed"

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span
          className={clsx(
            "px-2 py-1 text-xs rounded-full",
            priorityColor[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4 text-sm">
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

        <span className="text-gray-500">{task.status}</span>
      </div>
    </div>
  )
}
