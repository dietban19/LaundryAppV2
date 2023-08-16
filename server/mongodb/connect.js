import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.error(err));
};

export default connectDB;
