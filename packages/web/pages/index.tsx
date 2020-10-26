import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AskQ } from "../components/home/AskQ";
import { Questions } from "../components/home/Questions";
import styles from "../styles/home.module.css";
import { Subject } from "../types/subject";
import { get_page } from "../util/getQuestions";

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
  const router = useRouter();

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
      <div>
        <Link href={`/?page=${get_page() > 0 ? get_page() - 1 : 0}`}>
          <a className={styles.page_left}>Previous Page</a>
        </Link>
        <Link href={`/?page=${get_page() + 1}`}>
          <a className={styles.page_right}>Next Page</a>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <Questions
        check_answered={check_answered}
        subject={subject ? subject : undefined}
      />
    </div>
  );
};

export default Home;
