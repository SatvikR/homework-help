import { AxiosRequestConfig } from "axios";
import { Refresh } from "../types/token";
import { api } from "./api";

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig | undefined
) => {
  const res = await api.get<T>(url, config);
  return res;
};

export const validate_and_fetch = async <T>(
  url: string,
  config?: AxiosRequestConfig | undefined
) => {
  let access = localStorage.getItem("access_token");
  let refresh = localStorage.getItem("refresh_token");
  let expires = localStorage.getItem("expires");

  if (!(access && refresh && expires)) throw new Error("missing creds");

  if (new Date(expires) <= new Date(Date.now() - 15000)) {
    const res = await api.request<Refresh>({
      method: "PATCH",
      url: "/token/refresh",
      headers: { "content-type": "application/json" },
      data: {
        token: refresh,
      },
    });

    localStorage.setItem("access_token", res.data.token);
    access = res.data.token;
    localStorage.setItem("expires", res.data.expires);
    expires = res.data.expires;
  }

  const req_config = config || {};

  req_config.headers = {
    authorization: `Bearer ${access}`,
  };

  const res = await api.get<T>(url, req_config);

  return res;
};

export const refresh_token = async () => {
  let access = localStorage.getItem("access_token");
  let refresh = localStorage.getItem("refresh_token");
  let expires = localStorage.getItem("expires");

  if (!(access && refresh && expires)) throw new Error("missing creds");

  if (new Date(expires) <= new Date(Date.now() - 15000)) {
    const res = await api.request<Refresh>({
      method: "PATCH",
      url: "/token/refresh",
      headers: { "content-type": "application/json" },
      data: {
        token: refresh,
      },
    });

    localStorage.setItem("access_token", res.data.token);
    access = res.data.token;
    localStorage.setItem("expires", res.data.expires);
    expires = res.data.expires;
  }
};
