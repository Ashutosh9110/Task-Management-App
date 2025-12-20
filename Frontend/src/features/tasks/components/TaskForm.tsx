import { useState } from "react"
import { createTask } from "../../../api/task.api"
import { useAuth } from "../../../hooks/useAuth"
import { useUsers } from "../../users/hooks/useUsers"
import type { TaskPriority, TaskStatus } from "../task.types"

type Props = {
  onSuccess?: () => void
}

type TaskFormState = {
  title: string
  description: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus
  assignedToId: string
}

const PRIORITIES = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" }
]

const STATUSES = [
  { label: "To Do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" }
]

export function TaskForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { data: users = [] } = useUsers()

  const [form, setForm] = useState<TaskFormState>({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "TODO",
    assignedToId: ""
  })

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createTask({
        ...form,
        dueDate: new Date(form.dueDate).toISOString()
      })

      onSuccess?.()
    } catch (err) {
      console.error("Failed to create task", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create Task</h2>

      <input
        name="title"
        required
        value={form.title}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        placeholder="Task title"
      />

      <textarea
        name="description"
        rows={3}
        value={form.description}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        placeholder="Optional details"
      />

      <input
        type="datetime-local"
        name="dueDate"
        required
        value={form.dueDate}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      />

      <select name="priority" value={form.priority} onChange={onChange}>
        {PRIORITIES.map(p => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select name="status" value={form.status} onChange={onChange}>
        {STATUSES.map(s => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <div>
        <label className="block text-sm font-medium mb-1">
          Assign To
        </label>
        <select
          name="assignedToId"
          required
          value={form.assignedToId}
          onChange={onChange}
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
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  )
}
