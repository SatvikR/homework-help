import { api } from "./api";
import { refresh_token } from "./fetcher";

export const validate_answer = async (id: string) => {
  await refresh_token();

  const res = await api.request({
    method: "PATCH",
    url: "/answer/validate",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: { id: id },
  });

  return res;
};
