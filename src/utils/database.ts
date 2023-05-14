import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    console.log(process.env.MONGODB_URI ?? "");
    await mongoose.connect(process.env.MONGODB_DB_URI ?? "", {
      dbName: process.env.MONGODB_DB_NAME ?? "",
    });
    isConnected = true;
  } catch (err) {
    console.log("=> error connecting to database: ", err);
  }
};
