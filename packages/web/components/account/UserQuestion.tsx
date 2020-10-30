import React from "react";
import { Author, Question as IQuestion } from "../../types/question";
import styles from "../../styles/question.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { delete_question } from "../../util/deleteQuestion";

interface Props {
  question: IQuestion;
  author: Author;
  id: string;
}

const LEN = 200;

export const UserQuestion: React.FC<Props> = (props) => {
  const router = useRouter();

  const handleDelete = () => {
    delete_question(props.id).then(() => router.reload());
  };

  const handleEdit = () => {
    router.push(`/edit/${props.id}`);
  };

  return (
    <div className={styles.user_question}>
      <div className={styles.title}>
        <h2>
          {props.author.username} asks: {props.question.title}{" "}
        </h2>
      </div>
      <div className={styles.date}>
        <p>
          Asked on {new Date(props.question.createdAt).toLocaleDateString()}
          {props.question.answered && " (Answered)"}
          <Link href={`/view/${props.id}`}>
            <a className={styles.button}>View</a>
          </Link>
        </p>
      </div>
      <div className={styles.subject}>
        <p>{props.question.subject}</p>
      </div>
      <div className={styles.edit}>
        <button className={styles.button} onClick={handleEdit}>
          Edit
        </button>
      </div>
      <div className={styles.delete}>
        <button className={styles.button} onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      <div className={styles.description}>
        <p>{props.question.description.slice(0, LEN) + "..."}</p>
      </div>
    </div>
  );
};
