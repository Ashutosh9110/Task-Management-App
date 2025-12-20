import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  dueDate: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]),
  assignedToId: z.string().uuid()
})

export type TaskFormValues = z.infer<typeof taskSchema>
