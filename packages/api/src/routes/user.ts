import express from "express";
import User from "../models/User";
import { IUser } from "../types/models";
import argon2 from "argon2";

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

    await new_user.save();

    return res.json({
      message: "User created",
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

    return res.json({
      message: "Login succesful",
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
