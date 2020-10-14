import { Document } from "mongoose";

type Subject = "math" | "english" | "history" | "science" | "computer science";

export interface IUser extends Document {
  username: string;
  password: string;
}

export interface IQuestion extends Document {
  author: IUser["_id"];
  subject: Subject;
  title: string;
  description: string;
  image?: string;
}

export interface IAnswer extends Document {
  question: IQuestion["_id"];
  author: IUser["_id"];
  answer: string;
  valid: boolean;
}

export interface Search {
  title?: {
    $regex: RegExp;
  };
  subject?: Subject;
}
