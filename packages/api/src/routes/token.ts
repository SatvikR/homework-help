import express from "express";
import { generate_token } from "../auth";
import { redis } from "../server";
import jwt from "jsonwebtoken";
import { IToken } from "../types/auth";

const router = express.Router();

router.route("/refresh").patch(async (req, res) => {
  try {
    const token: string | null = req.body.token;

    if (!token) {
      return res.status(401).json({
        error: "Token not found",
      });
    }

    if (!(await redis.exists(token))) {
      return res.status(401).json({
        error: "Refresh token does not exist",
      });
    }

    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || "secret",
      (err, payload) => {
        if (err) {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }

        const token = payload as IToken;

        if (token.type !== "refresh") {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }

        const new_token = generate_token("access", token.id);

        return res.json(new_token);
      }
    );
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
