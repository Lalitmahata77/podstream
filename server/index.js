import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import dbConnect from "./config/dbConnect.js"

import path from "path"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


import userRoute from "./routes/userRoute.js"
import podRoute from "./routes/podcastRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import uploadRoute from "./routes/uploadRoute.js"
app.use("/api/user", userRoute)
app.use("/api/podcast",podRoute)
app.use("/api/category",categoryRoute)
app.use("/api/upload",uploadRoute)





const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is runing on port : ${PORT}`);
    
})





