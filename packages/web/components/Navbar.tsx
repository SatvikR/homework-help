import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.title}>
          <h1>Homework Help</h1>
        </a>
      </Link>
      <div className={styles.search_div}>
        <input
          type="text"
          name="Search"
          placeholder="Search for a question..."
          className={styles.search}
          onChange={handleInput}
        />
        <Link href={`/search?query=${search}`}>
          <a className={styles.search_button}>Search</a>
        </Link>
      </div>
      <Link href="/account">
        <a className={styles.button}>Account</a>
      </Link>
    </div>
  );
};

export default Navbar;
