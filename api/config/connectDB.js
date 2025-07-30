const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected, Server running on ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB