import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js"

dotenv.config(
    {
        path : "./.env"
    }
)


connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log("ERROR RAISE" , err)
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server is set up port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGO DB CONNNECTION FAILED!!!", error)
})
