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
  __v: number;
}
