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
  return []
}



export async function createTask(payload: {
  title: string
  description?: string
  dueDate: string
  priority: string
  status: string
  assignedToId: string
}) {
  const res = await axios.post("/tasks", payload)
  return res.data
}