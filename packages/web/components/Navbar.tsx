import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${search}`, undefined, { shallow: true });
    }
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
          onKeyDown={handleKeyDown}
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
