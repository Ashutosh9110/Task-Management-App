import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../../../hooks/useSocket.js"
import type { Task } from "../task.types"

export function useTaskSocket() {
  const socket = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    // When any task is updated
    socket.on("task:updated", (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) => {
        if (!old) return []
        return old.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      })
    })

    // When a new task is created
    socket.on("task:created", (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old ? [task, ...old] : [task]
      )
    })

    // When a task is deleted
    socket.on("task:deleted", (taskId: string) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old ? old.filter(t => t.id !== taskId) : []
      )
    })

    return () => {
      socket.off("task:updated")
      socket.off("task:created")
      socket.off("task:deleted")
    }
  }, [socket, queryClient])
}
