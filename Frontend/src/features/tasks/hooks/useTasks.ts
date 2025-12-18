import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../../../api/task.api.js"
import type { Task } from "../task.types"

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 // 1 minute
  })
}
