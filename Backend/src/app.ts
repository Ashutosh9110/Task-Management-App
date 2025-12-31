import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js"


const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))

app.use(router)


app.use(errorMiddleware)

export default app

