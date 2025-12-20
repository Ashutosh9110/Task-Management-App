import { useState } from "react"
import { createTask } from "../../../api/task.api"
import { useAuth } from "../../../hooks/useAuth"

type Props = {
  onSuccess?: () => void
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
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "TODO",
    assignedToId: ""
  })

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        title: form.title,
        description: form.description,
        dueDate: new Date(form.dueDate).toISOString(),
        priority: form.priority,
        status: form.status,
        assignedToId: user!.id
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

      <div>
        <label className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          name="title"
          maxLength={100}
          required
          value={form.title}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Task title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Optional details"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <input
          type="datetime-local"
          name="dueDate"
          required
          value={form.dueDate}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={form.priority}
          onChange={onChange}
        >
          {PRIORITIES.map(p => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={onChange}
        >
          {STATUSES.map(s => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-1">
          Assign To (User ID)
        </label>
        <input
          name="assignedToId"
          required
          value={form.assignedToId}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
          placeholder="User ID"
        />
      </div> */}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  )
}
