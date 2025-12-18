import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import TaskDashboard from "../features/tasks/pages/TaskDashboard"
import TaskDetails from "../features/tasks/pages/TaskDetails"
import { useAuth } from "../hooks/useAuth"

export function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* Protected Routes */}
      {isAuthenticated && (
        <>
          <Route path="/" element={<TaskDashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  )
}
