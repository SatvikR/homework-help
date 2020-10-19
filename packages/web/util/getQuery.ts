import useSWR from "swr";
import { QuestionResponse } from "../types/question";
import { fetcher } from "./fetcher";

export const get_query = (query: string | undefined | string[]) => {
  let url = "/question/search";

  if (query) url += `?search=${query}`;

  const { data, error } = useSWR([url], (url) =>
    fetcher<QuestionResponse[]>(url)
  );

  return { data, error };
};
