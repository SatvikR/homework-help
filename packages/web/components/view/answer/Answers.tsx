import React from "react";
import { get_answers } from "../../../util/getAnswers";
import { Answer } from "./Answer";

interface Props {
  id: string;
  logged_in: boolean;
}

export const Answers: React.FC<Props> = (props) => {
  const { data, error } = get_answers(props.id);

  if (error) return <h1>Failed to load</h1>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      {data.data
        .sort((a, _b) => (a.answer.valid ? -1 : 1))
        .map((e, i) => (
          <Answer
            answer={e.answer}
            author={e.author}
            key={i}
            logged_in={props.logged_in}
          />
        ))}
    </div>
  );
};
