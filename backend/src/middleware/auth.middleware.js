const tokenblacklistModel=require("../models/tokenblacklist.model.js");
const jwt=require("jsonwebtoken");
async function authMiddleware(req,res,next){
   const token=req.cookies.token;
    if(!token){
        return res.status(400).json({message:"token required"})
    }
    try {
    const isTokenBlackListed=await tokenblacklistModel.findOne({token})
    if(isTokenBlackListed){
        return res.status(400).json({message:"token is blacklisted"})
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=decode;
    next()

        
    } catch (error) {
              console.error("Error Invalid  token:", error);
    res.status(401).json({ message: "Invalid token" },error);
    }
}

module.exports={authMiddleware}