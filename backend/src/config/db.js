const mongoose=require("mongoose")
const webcrypto = require("node:crypto").webcrypto;

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: webcrypto,
    configurable: true,
  })
} 

async function connectDB(){
    try {
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
        
    }
}
module.exports=connectDB