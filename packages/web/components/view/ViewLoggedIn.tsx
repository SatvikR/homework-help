import React, { useState } from "react";
import { Question } from "../../types/question";
import { getQueston } from "../../util/getQuestion";
import styles from "../../styles/view.module.css";
import { mark_as_answered } from "../../util/markAsAnswered";
import { useRouter } from "next/router";
import { Answers } from "./answer/Answers";
import { answer_question } from "../../util/answerQuestion";

interface Props {
  id: Question["_id"];
}

export const ViewLoggedIn: React.FC<Props> = (props) => {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  const { data, error } = getQueston(props.id);

  if (error) return <h1>Failed to load...</h1>;
  if (!data) return <h1>Loading...</h1>;

  const question = data.data.question;
  const user = data.data.author;

  const handleClick = () => {
    mark_as_answered(props.id)
      .then((res) => console.log(res.data))
      .then(() => router.reload());
  };

  const handleAnswer = () => {
    setInputOpen(false);
    answer_question(props.id, input)
      .then((res) => console.log(res.data))
      .then(() => router.reload());
  };

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
            {question.answered ? (
              <p style={{ float: "right" }}>
                This question has been marked as answered
              </p>
            ) : (
              <button onClick={() => handleClick()}>Mark as Answered</button>
            )}
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
      <button className={styles.add} onClick={() => setInputOpen(true)}>
        Add your Answer
      </button>
      {inputOpen && (
        <div className={styles.input_div}>
          <label htmlFor="answer" className={styles.label}>
            Answer:
          </label>
          <br />
          <textarea
            name="answer"
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles.add} onClick={() => handleAnswer()}>
            Submit
          </button>
        </div>
      )}
      <h1>Answers: </h1>
      <Answers id={props.id} logged_in={true} />
    </>
  );
};
