import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection successful");
  } catch (err) {
    console.log("DB connection Error - ", err);
    process.exit(1);
  }
}

export default connectDB;
