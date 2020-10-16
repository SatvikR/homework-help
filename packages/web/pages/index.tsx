import React, { useState } from "react";
import { AskQ } from "../components/home/AskQ";
import styles from "../styles/home.module.css";
import { Subject } from "../types/subject";

// TEMP

const subjects: Subject[] = [
  "computer science",
  "english",
  "history",
  "math",
  "science",
];

const Home: React.FC = () => {
  const [subject, setSubject] = useState<Subject | null>();

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
      </div>
    </div>
  );
};

export default Home;
