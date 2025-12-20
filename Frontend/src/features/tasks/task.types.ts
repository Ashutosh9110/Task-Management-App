export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED"

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus

  creatorId: string
  assignedToId: string | null

  createdAt: string
  updatedAt: string
}
