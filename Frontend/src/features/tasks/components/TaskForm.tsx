  import { useForm } from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { taskSchema } from "../task.schema"
  import type { TaskFormValues } from "../task.schema"
  import { useUsers } from "../../users/hooks/useUsers"
  import { useAuth } from "../../../hooks/useAuth"
  import { createTask } from "../../../api/task.api"
  import type { TaskPriority, TaskStatus } from "../task.types"

  type Props = {
    onSuccess?: () => void
  }

  type User = {
    id: string
    name?: string
    email: string
  }


  const PRIORITIES: { label: string; value: TaskPriority }[] = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Urgent", value: "URGENT" }
  ]

  const STATUSES: { label: string; value: TaskStatus }[] = [
    { label: "To Do", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Review", value: "REVIEW" },
    { label: "Completed", value: "COMPLETED" }
  ]

  export function TaskForm({ onSuccess }: Props) {
    const { user } = useAuth()
    const { data: users = [] } = useUsers() as { data: User[] }

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm<TaskFormValues>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        priority: "MEDIUM",
        status: "TODO"
      }
    })

    const submit = async (data: TaskFormValues) => {
      await createTask({
        ...data,
        dueDate: new Date(data.dueDate).toISOString()
      })
      onSuccess?.()
    }


      return (
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5 text-gray-200 rounded-lg bg-white/5 border border-white/10 p-5">
          <h2 className="text-xl font-semibold text-white">
            Create Task
          </h2>
      
          <div className="space-y-1">
            <input
              {...register("title")}
              placeholder="Task title"
              className="
                w-full rounded-md border border-white/10
                bg-white/5 px-3 py-2
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
            />
            {errors.title && (
              <p className="text-red-400 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
      
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Optional details"
            className="
              w-full rounded-md border border-white/10
              bg-white/5 px-3 py-2
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-white/20
            "
          />
      
          <div className="space-y-1">
            <input
              type="datetime-local"
              {...register("dueDate")}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"/>
            {errors.dueDate && (
              <p className="text-red-400 text-sm">
                {errors.dueDate.message}
              </p>
            )}
          </div>
      
          <div className="grid grid-cols-2 gap-4">
            <select
              {...register("priority")}
              className="
                w-full rounded-md border border-white/10
                bg-white/5 px-3 py-2
                text-white
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
            >
              {PRIORITIES.map(p => (
                <option
                  key={p.value}
                  value={p.value}
                  className="bg-gray-900"
                >
                  {p.label}
                </option>
              ))}
            </select>
      
            <select
              {...register("status")}
              className="
                w-full rounded-md border border-white/10
                bg-white/5 px-3 py-2
                text-white
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
            >
              {STATUSES.map(s => (
                <option
                  key={s.value}
                  value={s.value}
                  className="bg-gray-900"
                >
                  {s.label}
                </option>
              ))}
            </select>
          </div>
      
          <div className="space-y-1">
            <label className="text-sm text-gray-400">
              Assign To
            </label>
            <select
              {...register("assignedToId")}
              className=" w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer">
              <option value="" className="bg-gray-900">
                Select user
              </option>
              {users
                .filter(u => u.id !== user?.id)
                .map(u => (
                  <option
                    key={u.id}
                    value={u.id}
                    className="bg-gray-900"
                  >
                    {u.name || u.email}
                  </option>
                ))}
            </select>
            {errors.assignedToId && (
              <p className="text-red-400 text-sm">
                {errors.assignedToId.message}
              </p>
            )}
          </div>
      
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-50 transition cursor-pointer">
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      )
      
  }  
