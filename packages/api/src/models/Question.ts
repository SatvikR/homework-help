import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../types/models";

const question_schema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  {}
);

export default mongoose.model<IQuestion>("name", question_schema);
