import React, { useState } from "react";
import { AskQ } from "../components/home/AskQ";
import { Questions } from "../components/home/Questions";
import styles from "../styles/home.module.css";
import { Subject } from "../types/subject";

const subjects: Subject[] = [
  "computer science",
  "english",
  "history",
  "math",
  "science",
];

const Home: React.FC = () => {
  const [subject, setSubject] = useState<Subject | null>();
  const [check_answered, setCheck] = useState<boolean>(false);

  const handleSubjectClick = (s: Subject) => {
    setSubject(s);
  };

  const handleSubjectClear = () => {
    setSubject(null);
  };

  return (
    <div className="container">
      <AskQ />
      <div className={styles.heading}>
        <h1>Recent Questions:</h1>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            {subject ? subject : "Subject ▼"}
          </button>
          <div className={styles.dropdown_content}>
            {subjects.map((e, i) => (
              <p key={i} onClick={() => handleSubjectClick(e)}>
                {e}
              </p>
            ))}
            <p onClick={() => handleSubjectClear()}>all</p>
          </div>
        </div>
        <label className={styles.check}>
          Include Answered Questions
          <input
            type="checkbox"
            checked={check_answered}
            onChange={() => setCheck(!check_answered)}
          />
        </label>
      </div>
      <Questions
        check_answered={check_answered}
        subject={subject ? subject : undefined}
      />
    </div>
  );
};

export default Home;
