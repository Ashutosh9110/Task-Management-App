import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../../../hooks/useSocket.js"
import type { Task } from "../task.types"

export function useTaskSocket() {
  const socket = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on("task:updated", (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => {
        const exists = old.some(t => t.id === updatedTask.id)

        // task newly assigned to me
        if (!exists) {
          return [updatedTask, ...old]
        }

        return old.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      })
    })

    socket.on("task:created", (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => {
        const exists = old.some(t => t.id === task.id)
        return exists ? old : [task, ...old]
      })
    })

    socket.on("task:deleted", (taskId: string) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter(t => t.id !== taskId)
      )
    })

    return () => {
      socket.off("task:updated")
      socket.off("task:created")
      socket.off("task:deleted")
    }
  }, [socket, queryClient])
}

