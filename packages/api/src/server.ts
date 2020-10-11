import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";

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
