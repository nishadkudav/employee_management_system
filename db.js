import mongoose from "mongoose";


async function connectDB() {

    await mongoose.connect(process.env.DB)
    
}


export default connectDB;