import express from "express";
import User from "../models/User";
import { IUser } from "../types/models";
import argon2 from "argon2";
import { generate_token, save_token } from "../auth";
import { redis } from "../server";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const username: IUser["username"] | null = req.body.username;
    const password: IUser["password"] | null = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const existing_user = await User.findOne({ username: username });

    if (existing_user) {
      return res.status(403).json({
        error: "User already exists",
      });
    }

    const hashed_password = argon2.hash(password);

    const new_user = new User({
      username: username,
      password: await hashed_password,
    });

    const refresh = generate_token("refresh", new_user._id);
    const access = generate_token("access", new_user._id);

    await Promise.all([new_user.save(), save_token(refresh, new_user._id)]);

    return res.json({
      refresh: refresh.token,
      access: access,
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const username: IUser["username"] | null = req.body.username;
    const password: IUser["password"] | null = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    const target_user = await User.findOne({ username: username });

    if (!target_user) {
      return res.status(403).json({
        error: "User does not exist",
      });
    }

    if (!(await argon2.verify(target_user.password, password))) {
      return res.status(403).json({
        error: "Password incorrect",
      });
    }

    const refresh = generate_token("refresh", target_user._id);
    const access = generate_token("access", target_user._id);

    await save_token(refresh, target_user._id);

    return res.json({
      refresh: refresh.token,
      access: access,
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.route("/logout").delete(async (req, res) => {
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

    await redis.del(token);

    return res.json({
      message: "Token Deleted",
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
