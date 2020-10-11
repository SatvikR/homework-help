import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/models";

const user_schema = new Schema(
  {
    username: { type: String, required: true, minlength: 3, unique: true },
    password: { type: String, required: true, minlength: 3 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", user_schema);
