import http from "http"
import app from "./app.js"
import { initSocket } from "./config/socket.js"

const server = http.createServer(app)

initSocket(server)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

