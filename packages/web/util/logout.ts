import { api } from "./api";

export const logout = async () => {
  await api.request({
    method: "DELETE",
    url: "/user/logout",
    headers: { "content-type": "application/json" },
    data: {
      token: localStorage.getItem("refresh_token"),
    },
  });
};

export const delete_tokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires");
};
