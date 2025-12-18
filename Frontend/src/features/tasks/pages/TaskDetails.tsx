import { useParams, useNavigate } from "react-router-dom"

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">
          Task Details
        </h1>

        <p className="text-gray-500 mb-4">
          Task ID: <span className="font-mono">{id}</span>
        </p>

        <div className="text-gray-400 italic">
          Full task details UI coming next…
        </div>
      </div>
    </div>
  )
}
