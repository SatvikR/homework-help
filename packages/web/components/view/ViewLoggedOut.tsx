import React from "react";
import { Question } from "../../types/question";
import { getQueston } from "../../util/getQuestion";
import styles from "../../styles/view.module.css";
import { Answers } from "./answer/Answers";

interface Props {
  id: Question["_id"];
}

export const ViewLoggedOut: React.FC<Props> = (props) => {
  const { data, error } = getQueston(props.id);

  if (error) return <h1>Failed to load...</h1>;
  if (!data) return <h1>Loading...</h1>;

  const question = data.data.question;
  const user = data.data.author;
  return (
    <>
      <div className={styles.question}>
        <h1>{question.title}</h1>
        <div className={styles.header_two}>
          <p className={styles.header_left}>
            <i>
              {user.username} asked on{" "}
              {new Date(question.createdAt).toLocaleDateString()}
            </i>
          </p>
          <div className={styles.header_right}>
            <div className={styles.header_right}>
              {question.answered ? (
                <p style={{ float: "right" }}>
                  This question has been marked as answered
                </p>
              ) : (
                <p>This question has not been marked as answered</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.img_container}>
          {question.image && (
            <img src={question.image} className={styles.image} />
          )}
        </div>
        <h2>Description:</h2>
        <div className={styles.description}>
          <p>{question.description}</p>
        </div>
      </div>
      <h1>Answers: </h1>
      <Answers id={props.id} logged_in={false} />
    </>
  );
};
