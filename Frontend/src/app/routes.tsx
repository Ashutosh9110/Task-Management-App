import React from "react" 
import { Routes, Route, Navigate } from "react-router-dom"
import SlidingAuth from "../features/auth/pages/SlidingAuth"
// import Register from "../features/auth/pages/Register" // Removed
import TaskDashboard from "../features/tasks/pages/TaskDashboard"
import TaskDetails from "../features/tasks/pages/TaskDetails"
import Welcome from "../features/auth/pages/Welcome"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
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
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<SlidingAuth initialMode="signin" />} />
      <Route path="/register" element={<SlidingAuth initialMode="signup" />} />
      <Route path="/app" element={ <ProtectedRoute> <TaskDashboard /> </ProtectedRoute> } />
      <Route path="/tasks/:id" element={ <ProtectedRoute> <TaskDetails /> </ProtectedRoute> } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
