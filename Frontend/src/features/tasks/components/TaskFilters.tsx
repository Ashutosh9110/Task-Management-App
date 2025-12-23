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

function getStatusOptionClass(status: string) {
  switch (status) {
    case "To Do":
      return "bg-gray-100 text-gray-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Review":
      return "bg-yellow-100 text-yellow-800"
    case "Completed":
      return "bg-green-100 text-green-800"
    default:
      return "bg-white text-gray-800"
  }
}

function getPriorityOptionClass(priority: string) {
  switch (priority) {
    case "Low":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "High":
      return "bg-orange-100 text-orange-800"
    case "Urgent":
      return "bg-red-100 text-red-800"
    default:
      return "bg-white text-gray-800"
  }
}

export function TaskFilters({
  status,
  priority,
  sort,
  setStatus,
  setPriority,
  setSort,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" h-10 px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/60 cursor-pointer"
        >
          {statuses.map((s) => (
            <option key={s} className={getStatusOptionClass(s)}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Priority</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="h-10 px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/60 cursor-pointer"
        >
          {priorities.map((p) => (
            <option key={p} className={getPriorityOptionClass(p)}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">Sort by</span>
        <button
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          className="h-10 px-4 rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition cursor-pointer"
        >
          Due Date {sort === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  )
}
