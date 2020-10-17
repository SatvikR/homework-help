import { AxiosRequestConfig } from "axios";
import { api } from "./api";

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig | undefined
) => {
  const res = await api.get<T>(url, config);
  return res;
};
