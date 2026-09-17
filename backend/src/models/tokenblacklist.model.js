const mongoose=require('mongoose');

const tokenblacklistSchema=new mongoose.Schema({
    token:{type:String,required:true}
},{
    timestamps:true
})
const tokenblacklistModel=mongoose.model("tokenblacklist",tokenblacklistSchema);
module.exports=tokenblacklistModel