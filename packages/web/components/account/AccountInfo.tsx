import React from "react";
import { getUserInfo } from "../../util/getUserInfo";
import styles from "../../styles/user.module.css";
import { delete_tokens, logout } from "../../util/logout";
import { useRouter } from "next/router";
import { Question } from "../home/Question";
import Link from "next/link";

export const AccountInfo: React.FC = () => {
  const { data, error } = getUserInfo();
  const router = useRouter();

  if (error) return <h1>Failed to load...</h1>;

  if (!data) return <h1>Loading...</h1>;

  const handleLogout = () => {
    logout()
      .then(() => delete_tokens())
      .then(() => router.push("/"));
  };

  return (
    <div>
      <h1>
        Account:{" "}
        <button className={styles.logout} onClick={() => handleLogout()}>
          Logout
        </button>
      </h1>
      <div className={styles.user_info}>
        <h2>Hello, {data.data.user_data.username}</h2>
        <br />
        <h2>Asked: {data.data.user_data.posts}</h2>
        <h2>Answered: {data.data.user_data.answers}</h2>
      </div>
      <div>
        {data.data.user_questions.map((e, i) => (
          <Link href={`/view/${e.question._id}`}>
            <a className="empty_link">
              <Question author={e.author} question={e.question} key={i} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
