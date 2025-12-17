import { Listbox } from "@headlessui/react"
import clsx from "clsx"

const statuses = ["All", "To Do", "In Progress", "Review", "Completed"]
const priorities = ["All", "Low", "Medium", "High", "Urgent"]

type Props = {
  status: string
  priority: string
  sort: "asc" | "desc"
  setStatus: (v: string) => void
  setPriority: (v: string) => void
  setSort: (v: "asc" | "desc") => void
}

export function TaskFilters({
  status,
  priority,
  sort,
  setStatus,
  setPriority,
  setSort
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 rounded-md border bg-white"
      >
        {statuses.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 py-2 rounded-md border bg-white"
      >
        {priorities.map(p => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <button
        onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        className="px-4 py-2 rounded-md border bg-gray-50 hover:bg-gray-100"
      >
        Due Date: {sort === "asc" ? "↑" : "↓"}
      </button>
    </div>
  )
}
