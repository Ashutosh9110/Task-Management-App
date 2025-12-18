import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import TaskDashboard from "../features/tasks/pages/TaskDashboard"
import TaskDetails from "../features/tasks/pages/TaskDetails"
import Welcome from "../features/auth/pages/Welcome"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route path="/app" element={ <ProtectedRoute> <TaskDashboard /> </ProtectedRoute> } />
      <Route path="/tasks/:id" element={ <ProtectedRoute> <TaskDetails /> </ProtectedRoute> } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
