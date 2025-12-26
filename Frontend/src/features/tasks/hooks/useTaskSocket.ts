import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import type { Task } from "../task.types"
import { useSocket } from "../../../context/SocketContext"

export function useTaskSocket() {
  const socket = useSocket()
  const queryClient = useQueryClient()

    useEffect(() => {
      if (!socket) return

      const onTaskCreated = (task: Task) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) => {
          if (old.some(t => t.id === task.id)) return old
          return [task, ...old]
        })
      }
  
      const onTaskUpdated = (updatedTask: Task) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
          old.map(t => t.id === updatedTask.id ? updatedTask : t)
        )
      }
  
      const onTaskDeleted = (taskId: string) => {
        queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
          old.filter(t => t.id !== taskId)
        )
      }
  
      socket.on("task:created", onTaskCreated)
      socket.on("task:updated", onTaskUpdated)
      socket.on("task:deleted", onTaskDeleted)
  
      return () => {
        socket.off("task:created", onTaskCreated)
        socket.off("task:updated", onTaskUpdated)
        socket.off("task:deleted", onTaskDeleted)
      }
    }, [socket, queryClient])
  }
  