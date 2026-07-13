import mongoose from "mongoose"
const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(conn.connection.host)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

export default connectDB;
