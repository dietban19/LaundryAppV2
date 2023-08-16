import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./mongodb/connect.js";
import users from "./routes/user.routes.js";
dotenv.config();

const app = express();
// app.use(cors());
// app.use(cors({ credentials: true, origin: "http://localhost:5175" }));
// Body parsing middleware to handle JSON and url-encoded data with specified limits
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use(cookieParser());
// Other middleware
// app.use(cookieParser());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
const PORT = process.env.PORT || 8000;
const connectionString = process.env.ATLAS_URI || "";
// console.log(connectionString);
// start the Express server
app.use("/", users);
const startServer = async () => {
  try {
    connectDB(connectionString);
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
