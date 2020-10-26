export interface AnswerRes {
  author: Author;
  answer: Answer;
}

export interface Answer {
  valid: boolean;
  _id: string;
  question: string;
  author: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Author {
  _id: string;
  username: string;
}
