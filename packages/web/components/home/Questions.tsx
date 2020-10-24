import Link from "next/link";
import React from "react";
import { Subject } from "../../types/subject";
import { get_questions } from "../../util/getQuestions";
import { Question } from "./Question";

interface Props {
  check_answered: boolean;
  subject?: Subject;
}

export const Questions: React.FC<Props> = (props) => {
  const { data, error } = get_questions(props.check_answered);

  if (error) return <h2>Failed to load... :{"("}</h2>;
  if (!data) return <h2>Loading...</h2>;

  const questions = data.data;

  return (
    <div>
      {questions
        .filter((e) =>
          props.subject ? e.question.subject === props.subject : true
        )
        .map((e, i) => (
          <Link href={`/view/${e.question._id}`}>
            <a className="empty_link">
              <Question author={e.author} question={e.question} key={i} />
            </a>
          </Link>
        ))}
    </div>
  );
};
