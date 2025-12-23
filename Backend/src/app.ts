import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js"


const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
app.use(router)
app.use(errorMiddleware)


export default app
