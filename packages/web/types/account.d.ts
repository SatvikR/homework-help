import { Author, Question } from "./question";

export interface FormRes {
  refresh: string;
  access: Access;
  error?: string;
}

export interface Access {
  token: string;
  expires: string;
}
export interface UserInfoRes {
  user_data: UserData;
  user_questions: UserQuestion[];
}

export interface UserData {
  username: string;
  posts: number;
  answers: number;
}

export interface UserQuestion {
  author: Author;
  question: Question;
}
