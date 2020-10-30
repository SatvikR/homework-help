import { Question } from "../types/question";
import { Subject } from "../types/subject";
import { api } from "./api";
import { refresh_token } from "./fetcher";

export const edit_question = async (
  id: string,
  answered: boolean,
  author: string,
  subject: Subject,
  title: string,
  description: string
) => {
  await refresh_token();

  const res = await api.request<Question>({
    method: "PATCH",
    url: "/question/edit",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: {
      answered: answered,
      id: id,
      author: author,
      subject: subject,
      title: title,
      description: description,
    },
  });

  return res;
};
