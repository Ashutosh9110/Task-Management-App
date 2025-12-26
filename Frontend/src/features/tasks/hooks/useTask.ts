import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTaskById, updateTask } from "../../../api/task.api"
import type { Task } from "../task.types"

export function useTask(id: string) {
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => 
      updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["task", updatedTask.id], updatedTask)      
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map(t => t.id === updatedTask.id ? updatedTask : t)
      )
    },
    onError: (error) => {
      console.error("Failed to update task:", error)
    }
  })
}