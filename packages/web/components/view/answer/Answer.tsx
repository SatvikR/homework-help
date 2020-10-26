import React from "react";
import { Answer as IAnswer } from "../../../types/answer";
import { Author } from "../../../types/question";
import styles from "../../../styles/answer.module.css";
import { validate_answer } from "../../../util/validateAnswer";
import { useRouter } from "next/router";

interface Props {
  author: Author;
  answer: IAnswer;
  logged_in: boolean;
}

export const Answer: React.FC<Props> = (props) => {
  const router = useRouter();

  const handleClick = () => {
    validate_answer(props.answer._id)
      .then((res) => console.log(res))
      .then(() => router.reload());
  };

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.header_left}>{props.author.username}</h2>
        <div className={styles.valid}>
          {props.answer.valid ? (
            <p className={styles.valid_y}>Answer is Valid</p>
          ) : props.logged_in ? (
            <button
              className={styles.valid_button}
              onClick={() => handleClick()}
            >
              Mark as Valid
            </button>
          ) : (
            <p className={styles.valid_n}>Validity Unknown</p>
          )}
        </div>
      </div>
      <p>
        <i>
          Answered on {new Date(props.answer.createdAt).toLocaleDateString()}
        </i>
      </p>
      <p>{props.answer.answer}</p>
    </div>
  );
};
