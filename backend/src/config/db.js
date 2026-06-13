import mongoose from "mongoose"
import env from "./env.js";

const MONGO_URI = env.MONGO_URI

const connectDb = async () => {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Db connected successfully")
    } catch (error) {
        console.error("Db connection failed", error.message)
        process.exit(1)
    }

}

export default connectDb