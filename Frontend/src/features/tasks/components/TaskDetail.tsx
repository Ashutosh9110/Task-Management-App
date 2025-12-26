// frontend/src/features/tasks/components/TaskDetail.tsx
import { useState } from "react"
import { format } from "date-fns"
import { Calendar, User, Flag, Clock, Edit2, Save, X } from "lucide-react"
import type { Task } from "../task.types"
import { useAuth } from "../../../hooks/useAuth"
import { useUpdateTask } from "../hooks/useTask"

interface TaskDetailProps {
  task: Task
  onClose?: () => void
}

// Dark theme colors
const priorityColors = {
  LOW: "bg-green-500/20 text-green-300 border border-green-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  HIGH: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  URGENT: "bg-red-500/20 text-red-300 border border-red-500/30"
}

const statusColors = {
  TODO: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
  IN_PROGRESS: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  REVIEW: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  COMPLETED: "bg-green-500/20 text-green-300 border border-green-500/30"
}

const statusOptions = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "REVIEW", label: "Review" },
  { value: "COMPLETED", label: "Completed" }
]

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" }
]

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const { user } = useAuth()
  const { mutate: updateTask, isPending } = useUpdateTask()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Partial<Task>>({})

  const isCreator = user?.id === task.creatorId
  const isAssignee = user?.id === task.assignedToId
  const canEdit = isCreator || isAssignee

  const handleSave = () => {
    if (Object.keys(editedTask).length > 0) {
      updateTask(
        { id: task.id, data: editedTask },
        {
          onSuccess: () => {
            setIsEditing(false)
            setEditedTask({})
          }
        }
      )
    } else {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTask({})
  }

  const handleChange = (field: keyof Task, value: any) => {
    setEditedTask(prev => ({ ...prev, [field]: value }))
  }

  const currentStatus = editedTask.status ?? task.status
  const currentPriority = editedTask.priority ?? task.priority
  const currentDueDate = editedTask.dueDate 
    ? new Date(editedTask.dueDate).toISOString().slice(0, 16)
    : task.dueDate.slice(0, 16)

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-black/30">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                defaultValue={task.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full text-2xl font-bold bg-gray-900/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                placeholder="Task title"
              />
            ) : (
              <h1 className="text-2xl font-bold text-white">{task.title}</h1>
            )}
            <div className="flex items-center gap-4 mt-3">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusColors[currentStatus]}`}>
                {statusOptions.find(s => s.value === currentStatus)?.label}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${priorityColors[currentPriority]}`}>
                {priorityOptions.find(p => p.value === currentPriority)?.label}
              </span>
            </div>
          </div>
          
          {canEdit && (
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors cursor-pointer ml-4"
                  >
                    <Save size={16} />
                    {isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            {isEditing ? (
              <textarea
                defaultValue={task.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                className="w-full bg-gray-900/50 border border-white/10 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500"
                placeholder="Add a description..."
              />
            ) : (
              <div className="bg-gray-900/30 rounded-lg p-5 min-h-[150px] border border-white/5">
                <p className="text-gray-300 whitespace-pre-wrap">
                  {task.description || "No description provided"}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-gray-400" />
                <h4 className="font-medium text-gray-300">Due Date</h4>
              </div>
              {isEditing ? (
                <input
                  type="datetime-local"
                  defaultValue={currentDueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className="w-full bg-gray-900/50 border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                />
              ) : (
                <p className="text-white font-medium">
                  {format(new Date(task.dueDate), "PPP 'at' p")}
                </p>
              )}
            </div>

            <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Flag size={18} className="text-gray-400" />
                <h4 className="font-medium text-gray-300">Status</h4>
              </div>
              {isEditing ? (
                <select
                  value={currentStatus}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full bg-gray-900/50 border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={`px-3 py-1.5 rounded-full text-sm font-medium inline-block ${statusColors[currentStatus]}`}>
                  {statusOptions.find(s => s.value === currentStatus)?.label}
                </p>
              )}
            </div>

            <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Flag size={18} className="text-gray-400" />
                <h4 className="font-medium text-gray-300">Priority</h4>
              </div>
              {isEditing ? (
                <select
                  value={currentPriority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  className="w-full bg-gray-900/50 border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={`px-3 py-1.5 rounded-full text-sm font-medium inline-block ${priorityColors[currentPriority]}`}>
                  {priorityOptions.find(p => p.value === currentPriority)?.label}
                </p>
              )}
            </div>

            <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-gray-400" />
                <h4 className="font-medium text-gray-300">Created</h4>
              </div>
              <p className="text-gray-300">
                {format(new Date(task.createdAt), "PPP")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Creator */}
          <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-gray-400" />
              <h4 className="font-medium text-gray-300">Created By</h4>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <span className="text-blue-300 font-semibold">
                  {task.creator?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">
                  {task.creator?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-400">
                  {task.creator?.email || "creator"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-gray-400" />
              <h4 className="font-medium text-gray-300">Assigned To</h4>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <span className="text-green-300 font-semibold">
                  {task.assignedTo?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">
                  {task.assignedTo?.name || "Unassigned"}
                </p>
                <p className="text-sm text-gray-400">
                  {task.assignedTo?.email || "Not assigned yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-white/5">
            <h4 className="font-medium text-gray-300 mb-3">Task ID</h4>
            <code className="text-sm bg-gray-900/50 text-gray-300 px-3 py-2 rounded-lg border border-white/10 font-mono block overflow-x-auto">
              {task.id}
            </code>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-white/10 bg-black/30">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Last updated: {format(new Date(task.updatedAt), "PPP 'at' p")}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}