import useSWR from "swr";
import { UserInfoRes } from "../types/account";
import { validate_and_fetch } from "./fetcher";

export const getUserInfo = () => {
  const { data, error } = useSWR(["/user/data"], (url) =>
    validate_and_fetch<UserInfoRes>(url)
  );

  return { data, error };
};
