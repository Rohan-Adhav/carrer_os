import mongoose from "mongoose"
import env from "./env.js";

const MONGO_URI = env.MONGO_URI

const connectDb =async()=>{

    try {
        await mongoose.connect(MONGO_URI)
        console.log("Db connected successfully")
    } catch (error) {
        console.error("Db connection failed",error.message)
        process.exit(1)
    }

}

export default connectDb