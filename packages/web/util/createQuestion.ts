import { QuestionCreateRes } from "../types/question";
import { Subject } from "../types/subject";
import { api } from "./api";
import { refresh_token } from "./fetcher";

export const createQuestion = async (
  title: string,
  description: string,
  subject: Subject,
  image: string | null | undefined
) => {
  await refresh_token();

  const res = await api.request<QuestionCreateRes>({
    method: "POST",
    url: "/question/create",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: {
      subject: subject,
      title: title,
      description: description,
      image: image,
    },
  });

  return res;
};
