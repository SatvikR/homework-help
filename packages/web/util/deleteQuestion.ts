import { QuestionDelete } from "../types/question";
import { api } from "./api";
import { refresh_token } from "./fetcher";

export const delete_question = async (id: string) => {
  await refresh_token();

  const res = await api.request<QuestionDelete>({
    method: "DELETE",
    url: "/question/delete",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: { id: id },
  });

  return res;
};
