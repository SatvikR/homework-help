import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config({
  path:
    process.env.NODE_ENV == "production"
      ? ".env.production"
      : ".env.development",
});

app.use(cors());
app.use(express.json());

app.route("**/*").get((_req, res) => {
  res.json({
    message: "Hello, world",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
