import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import reportRouter from "./routes/interview.routes.js"
import cors from "cors"
const app = express()


app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended : true, limit : "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true // cookie data handle
}))


app.use("/api/v1/users", userRouter)
// https://localhost:5000/api/v1/users/register
app.use("/api/v1/report", reportRouter)
export default app
