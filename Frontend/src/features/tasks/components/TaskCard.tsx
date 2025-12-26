// frontend/src/features/tasks/components/TaskCard.tsx
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { Calendar, User } from "lucide-react"
import type { Task } from "../task.types"

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  LOW: "bg-green-500/20 text-green-300 border-green-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  HIGH: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  URGENT: "bg-red-500/20 text-red-300 border-red-500/30"
}

const statusColors = {
  TODO: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  IN_PROGRESS: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  REVIEW: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  COMPLETED: "bg-green-500/20 text-green-300 border-green-500/30"
}

export function TaskCard({ task }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "COMPLETED"
  
  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div className="group rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 p-4 backdrop-blur-sm hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-white group-hover:text-blue-300">
            {task.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {task.description || "No description provided"}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={12} />
              <span className={isOverdue ? "text-red-300" : ""}>
                {format(new Date(task.dueDate), "MMM d")}
                {isOverdue && " ⚠️"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <User size={12} />
              <span>{task.assignedTo?.name || "Unassigned"}</span>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {task.status.replace("_", " ")}
          </span>
        </div>
      </div>
    </Link>
  )
}