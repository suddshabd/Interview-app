import mongoose from "mongoose"
import { ENV } from "./env.js"


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("✅ Connect to MonoDB:", conn.connection.host)
    } catch {
        console.error("❌Error while connecting to MongoDB", error)
        process.exit(1)// 0 means success and 1 means failure
    }
}