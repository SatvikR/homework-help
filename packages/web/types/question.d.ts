export interface QuestionResponse {
  author: Author;
  question: Question;
}

export interface Author {
  _id: string;
  username: string;
}

export interface Question {
  answered: boolean;
  _id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  __v: number;
}

export interface QuestionCreateRes {
  answered: boolean;
  _id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  error?: string;
  __v: number;
}

export interface QuestionDelete {
  message: string;
}
