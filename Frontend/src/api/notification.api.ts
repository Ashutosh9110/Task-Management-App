import axios from "./axios"

export async function getNotifications() {
  try {
    const res = await axios.get("/notifications")
    // Ensure we always return an array
    if (Array.isArray(res.data)) {
      return res.data
    }
    // Handle different response formats
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data
    }
    if (res.data && Array.isArray(res.data.notifications)) {
      return res.data.notifications
    }
    console.warn("Unexpected notifications response format:", res.data)
    return []
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}