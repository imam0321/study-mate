import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGO_URL));
    return conn;
  } catch (error) {
    console.error(error);
  }
}
