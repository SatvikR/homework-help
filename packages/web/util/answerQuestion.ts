import { Answer } from "../types/answer";
import { api } from "./api";
import { refresh_token } from "./fetcher";

export const answer_question = async (id: string, answer: string) => {
  await refresh_token();

  const res = await api.request<Answer>({
    method: "POST",
    url: "/answer/create",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: {
      question: id,
      answer: answer,
    },
  });

  return res;
};
