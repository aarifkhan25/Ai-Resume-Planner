const express=require("express");
const app=express();
const cors=require("cors");
const authRouter=require("../src/route/auth.route.js"
)
const interviewRouter=require("../src/route/interview.route.js")
const cookieParser=require("cookie-parser")

app.use(express.json());    
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)

 module.exports=app
