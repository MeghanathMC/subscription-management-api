import { MONGO_URI, NODE_ENV } from "../config/dotenv.js";
import mongoose from "mongoose";

if (!MONGO_URI) {
  throw new Error("mongo connection string is required!! ");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`connected to mongodb successfuly in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1);
  }
};

export default connectDB;
