import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import dbConnect from "./config/dbConnect.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


import userRoute from "./routes/userRoute.js"
app.use("/api/user", userRoute)
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is runing on port : ${PORT}`);
    
})





