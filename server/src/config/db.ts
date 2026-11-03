import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDb connnected");
  } catch (error: any) {
    // console.log(error);
    console.error("Ошибка подключения к базе:", error.message);
    process.exit(1);
  }
};

export default connectDb;
