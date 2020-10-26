import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "./fetcher";
import { QuestionResponse } from "../types/question";

export const get_page = () => {
  const router = useRouter();

  return typeof router.query.page === "string"
    ? parseInt(router.query.page)
    : 0;
};

export const get_questions = (check_answered: boolean) => {
  const page = get_page();

  let url: string = `/question/?page=${page}`;

  if (check_answered) url += "&check_answered=1";

  const { data, error } = useSWR([url], (url) =>
    fetcher<QuestionResponse[]>(url)
  );

  return { data, error };
};
