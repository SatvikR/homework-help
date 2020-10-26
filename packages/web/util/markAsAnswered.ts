import { Question } from "../types/question";
import { api } from "./api";
import { refresh_token } from "./fetcher";

export const mark_as_answered = async (id: Question["_id"]) => {
  await refresh_token();

  const res = await api.request<Question>({
    method: "PATCH",
    url: "/question/answered",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: { id: id },
  });

  return res;
};
