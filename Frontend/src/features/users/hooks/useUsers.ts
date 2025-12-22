import { useQuery } from "@tanstack/react-query"
import axios from "../../../api/axios"

export type User = {
  id: string
  name?: string
  email: string
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/users")
      return res.data
    }
  })
}
