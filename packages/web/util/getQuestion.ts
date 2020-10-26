import useSWR from "swr";
import { Question, QuestionResponse } from "../types/question";
import { fetcher } from "./fetcher";

export const getQueston = (id: Question["_id"]) => {
  const url = `/question/get?id=${id}`;

  const { data, error } = useSWR([url], (url) =>
    fetcher<QuestionResponse>(url)
  );

  return { data, error };
};
