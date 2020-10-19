import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/form.module.css";
import { delete_tokens, logout } from "../../util/logout";

export const Logout: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    logout()
      .then(() => delete_tokens())
      .then(() => router.push("/"));
  };

  return (
    <div>
      <h1>Logout</h1>
      {/* Temporary */}
      <button className={styles.submit} onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
