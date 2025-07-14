import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connection successfull");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default dbConnection;
