import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../../../context/SocketContext"
import { Task } from "../task.types"

export const useTaskSocket = () => {
  const socket = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    socket.on("task:updated", (task: Task) => {
      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old = []) =>
          old.map(t => (t.id === task.id ? task : t))
      )
    })

    return () => {
      socket.off("task:updated")
    }
  }, [socket, queryClient])
}
