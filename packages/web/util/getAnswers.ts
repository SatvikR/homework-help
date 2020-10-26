import useSWR from "swr";
import { AnswerRes } from "../types/answer";
import { fetcher } from "./fetcher";

export const get_answers = (id: string) => {
  const url = `/answer/get?question=${id}`;

  const { data, error } = useSWR([url], (url) => fetcher<AnswerRes[]>(url));

  return { data, error };
};
