import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../types/models";

const question_schema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    answered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("Question", question_schema);
