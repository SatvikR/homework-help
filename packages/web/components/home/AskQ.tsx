import React from "react";
import Link from "next/link";
import styles from "../../styles/home.module.css";

export const AskQ: React.FC = () => {
  return (
    <div className={styles.ask_q}>
      <h2 className={styles.ask_title}>Do you need to ask a question?</h2>
      <Link href="#">
        <a className={styles.ask_link}>Ask a Question</a>
      </Link>
    </div>
  );
};
