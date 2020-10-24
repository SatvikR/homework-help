import React from "react";
import { useRouter } from "next/router";
import { get_query } from "../../util/getQuery";
import { Question } from "../home/Question";

export const Query: React.FC = () => {
  const router = useRouter();
  const { data, error } = get_query(router.query.query);

  if (error) return <h2>Failed to load...</h2>;
  if (!data) return <h2>Loading...</h2>;

  const questions = data.data;
  return (
    <div>
      <h1>Searches that match "{router.query.query || ""}":</h1>
      <div>
        {questions.map((e, i) => (
          <Question author={e.author} question={e.question} key={i} />
        ))}
      </div>
    </div>
  );
};
