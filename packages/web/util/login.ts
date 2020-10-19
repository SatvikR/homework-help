import { FormRes } from "../types/account";
import { api } from "./api";

export const login = async (username: string, password: string) => {
  const res = await api.post<FormRes>("/user/login", {
    username: username,
    password: password,
  });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const save_token = (data: FormRes) => {
  localStorage.setItem("access_token", data.access.token);
  localStorage.setItem("refresh_token", data.refresh);
  localStorage.setItem("expires", data.access.expires);
};
