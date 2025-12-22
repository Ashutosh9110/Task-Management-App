import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../../../hooks/useSocket.js"
import type { Task } from "../task.types"

export function useTaskSocket() {
  const socket = useSocket()
  const queryClient = useQueryClient()

    useEffect(() => {
      if (!socket) return
  
      const onTaskUpdated = (updatedTask: Task) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
          old.some(t => t.id === updatedTask.id)
            ? old.map(t => t.id === updatedTask.id ? updatedTask : t)
            : [updatedTask, ...old]
        )
      }
  
      const onTaskCreated = (task: Task) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
          old.some(t => t.id === task.id) ? old : [task, ...old]
        )
      }
  
      const onTaskDeleted = (taskId: string) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
          old.filter(t => t.id !== taskId)
        )
      }
  
      socket.on("task:updated", onTaskUpdated)
      socket.on("task:created", onTaskCreated)
      socket.on("task:deleted", onTaskDeleted)
  
      return () => {
        socket.off("task:updated", onTaskUpdated)
        socket.off("task:created", onTaskCreated)
        socket.off("task:deleted", onTaskDeleted)
      }
    }, [socket, queryClient])
  }
  