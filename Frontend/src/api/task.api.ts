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