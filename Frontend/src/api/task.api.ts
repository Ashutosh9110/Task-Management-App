import axios from "./axios"
import type { Task } from "../features/tasks/task.types"

export async function getTasks(): Promise<Task[]> {
  const res = await axios.get("/tasks")
  return res.data
}
