import { FormRes } from "../types/account";
import { api } from "./api";

export const signup = async (username: string, password: string) => {
  const res = await api.post<FormRes>("/user/signup", {
    username: username,
    password: password,
  });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};
