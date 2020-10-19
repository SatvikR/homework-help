import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";
import Redis from "ioredis";
import multer from "multer";
import aws from "aws-sdk";
import image_router from "./routes/image";
import { setup_upload, storage_engine } from "./upload";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config({
  path:
    process.env.NODE_ENV == "production"
      ? ".env.production"
      : ".env.development",
});

const db_uri = process.env.DB_URI || "mongo://localhost:27017/cluster0";

mongoose.connect(db_uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log(`Mongoose successfully connected to ${mongoose.connection.name}`);
});

export const redis = new Redis(process.env.REDIS_URL);

redis.connect(() => {
  console.log("IORedis successfuly connected");
});

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

console.log("Aws successfuly connected");

const s3 = new aws.S3();

export const upload = multer({
  storage: storage_engine(s3),
});

setup_upload(image_router);

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.route("/").get((_req, res) => {
  res.json({
    message: "Welcome to the homework help api",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
