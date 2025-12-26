// frontend/src/features/tasks/pages/TaskDetails.tsx
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2 } from "lucide-react"
import { TaskDetail } from "../components/TaskDetail"
import { useTaskSocket } from "../hooks/useTaskSocket"
import { useTask } from "../hooks/useTask"

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  useTaskSocket()
  
  const { data: task, isLoading, error } = useTask(id!)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-400">Loading task details...</p>
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="max-w-md p-6 rounded-xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-3">Task Not Found</h2>
          <p className="text-gray-400 mb-4">
            The task you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <button
            onClick={() => navigate("/app")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/app")}
          className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <TaskDetail task={task} />
      </div>
    </div>
  )
}