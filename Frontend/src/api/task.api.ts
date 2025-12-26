import axios from "./axios"
import type { Task } from "../features/tasks/task.types"


export async function getTasks(): Promise<Task[]> {
  const res = await axios.get("/tasks")
  if (Array.isArray(res.data)) {
    return res.data
  }
  if (Array.isArray(res.data.data)) {
    return res.data.data
  }
  console.warn("Unexpected tasks response format:", res.data)
  return []
}

export async function getTaskById(id: string): Promise<Task> {
  const res = await axios.get(`/tasks/${id}`)
  return res.data
}

export async function createTask(payload: {
  title: string
  description?: string
  dueDate: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"
  assignedToId: string
}) {
  const res = await axios.post("/tasks", payload)
  return res.data
}


export async function updateTask(id: string, payload: Partial<Task>) {
  const res = await axios.put(`/tasks/${id}`, payload)
  return res.data
}

export async function deleteTask(id: string) {
  const res = await axios.delete(`/tasks/${id}`)
  return res.data
}