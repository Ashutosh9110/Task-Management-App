import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema } from "../task.schema"
import type { TaskFormValues } from "../task.schema"
import { useUsers } from "../../users/hooks/useUsers"
import { useAuth } from "../../../hooks/useAuth"
import { createTask } from "../../../api/task.api"
import type { TaskPriority, TaskStatus } from "../task.types"

type Props = {
  onSuccess?: () => void
}

type User = {
  id: string
  name?: string
  email: string
}


const PRIORITIES: { label: string; value: TaskPriority }[] = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" }
]

const STATUSES: { label: string; value: TaskStatus }[] = [
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" }
]

export function TaskForm({ onSuccess }: Props) {
  const { user } = useAuth()
  const { data: users = [] } = useUsers() as { data: User[] }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "MEDIUM",
      status: "TODO"
    }
  })

  const submit = async (data: TaskFormValues) => {
    await createTask({
      ...data,
      dueDate: new Date(data.dueDate).toISOString()
    })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Create Task</h2>

      <input
        {...register("title")}
        placeholder="Task title"
        className="w-full border rounded px-3 py-2"
      />
      {errors.title && (
        <p className="text-red-400 text-sm">{errors.title.message}</p>
      )}

      <textarea
        {...register("description")}
        rows={3}
        placeholder="Optional details"
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="datetime-local"
        {...register("dueDate")}
        className="w-full border rounded px-3 py-2"
      />
      {errors.dueDate && (
        <p className="text-red-400 text-sm">{errors.dueDate.message}</p>
      )}

      <select {...register("priority")} className="w-full border rounded px-3 py-2">
        {PRIORITIES.map(p => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select {...register("status")} className="w-full border rounded px-3 py-2">
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <div>
        <label className="block text-sm font-medium mb-1">Assign To</label>
        <select
          {...register("assignedToId")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select user</option>
          {users
            .filter(u => u.id !== user?.id)
            .map(u => (
              <option key={u.id} value={u.id}>
                {u.name || u.email}
              </option>
            ))}
        </select>
        {errors.assignedToId && (
          <p className="text-red-400 text-sm">
            {errors.assignedToId.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  )
}
