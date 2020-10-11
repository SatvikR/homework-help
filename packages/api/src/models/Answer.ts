import mongoose, { Schema } from "mongoose";
import { IAnswer } from "../types/models";

const answer_schema = new Schema(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answer: { type: String, required: true },
    valid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IAnswer>("Answer", answer_schema);
