const express=require('express');
const authRouter=express.Router();
const {userRegister,userLogin,userLogout,getMe}=require("../controllers/auth.controllers.js")
const {authMiddleware}=require("../middleware/auth.middleware.js")
authRouter.post("/register",userRegister)
authRouter.post("/login",userLogin)
authRouter.get("/logout",userLogout)
authRouter.get("/get-me",authMiddleware,getMe)

module.exports=authRouter