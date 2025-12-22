import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js"


const app = express()

app.use(cors({
  origin: (origin, cb) => {
    const allowed = [
      "http://localhost:5173",
      "https://task-management-app19.netlify.app"
    ]
    if (!origin || allowed.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
app.use(router)
app.use(errorMiddleware)


export default app
