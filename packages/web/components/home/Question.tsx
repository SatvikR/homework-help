import React from "react";
import { Author, Question as IQuestion } from "../../types/question";
import styles from "../../styles/question.module.css";

interface Props {
  question: IQuestion;
  author: Author;
}

const LEN = 200;

export const Question: React.FC<Props> = (props) => {
  return (
    <div className={styles.question}>
      <div className={styles.title}>
        <h2>
          {props.author.username} asks: {props.question.title}
        </h2>
      </div>
      <div className={styles.date}>
        <p>
          Asked on {new Date(props.question.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.subject}>
        <p>{props.question.subject}</p>
      </div>
      <div className={styles.description}>
        <p>{props.question.description.slice(0, LEN) + "..."}</p>
      </div>
    </div>
  );
};
