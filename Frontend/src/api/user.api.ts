import axios from "./axios"

export async function getUsers() {
  const res = await axios.get("/users")
  return res.data
}
