import { useTasks } from "../hooks/useTasks"
import { useTaskSocket } from "../hooks/useTaskSocket"

export default function TaskDashboard() {
  useTaskSocket()
  const { data: tasks } = useTasks()

  return (
    <>
      {tasks?.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  )
}
