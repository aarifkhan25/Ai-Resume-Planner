const userModel=require("../models/user.model.js");
const tokenblacklistModel=require("../models/tokenblacklist.model.js");

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")

async  function userRegister(req,res){
    const {username,email,password}=req.body;

    const isUserExist= await userModel.findOne({
        $or:[{username},{email}]
    });
    if(isUserExist){
        res.status(400).json({message:"User already exists"});
    }
    try {
        
        
        const hashPassword= await bcrypt.hash(password,10)
        
        const user=await userModel.create({
            username,email,password:hashPassword
        })
        const token= jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
        res.cookie("token",token)
        res.status(201).json({message:"user register succefully",user:{username:user.username,id:user._id}})
    } catch (error) {
            console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
    }
}

async function userLogin(req,res){
const {username,email,password}=req.body
const userfind=await userModel.findOne({
    $or:[{username},{email}]
})
if(!userfind){
    res.status(400).json({message:"your not Register"})  
}
try {
    
    const checkPassowrd=await bcrypt.compare(password,userfind.password)
    if(!checkPassowrd){
      return  res.status(400).json({message:"Enter a valid password"})
    }
    const token=jwt.sign({id:userfind._id,username:userfind.email},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
    res.cookie("token",token)
    res.status(201).json({message:"user loggedIn sucessfully",user:{id:userfind._id,email:userfind.email}})
} catch (error) {
                console.error("Error login user:", error);
    res.status(500).json({ message: "Internal server error" 
})

}}

async function userLogout(req,res){
    const token=req.cookies.token
    if(!token){
          res.status(400).json({message:" token required"})
    }
try {
    
    const saveToken=await tokenblacklistModel.create({token});
    res.clearCookie("token")
    res.status(201).json({message:"token added in blacklist and user logout",token_id:saveToken._id})
} catch (error) {
                  console.error("Error to blocklist token:", error);
    res.status(500).json({ message: "Internal server error" 
})
}}


async function getMe(req,res){
    const user=await userModel.findById(req.user.id)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
 
    res.status(200).json({message:"user found", user: {
        id: user._id,
        username: user.username,
        email: user.email
    }})
}
module.exports={userRegister,userLogin,userLogout,getMe}