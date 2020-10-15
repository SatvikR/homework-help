import React from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.title}>
          <h1>Homework Help</h1>
        </a>
      </Link>
      <input
        type="text"
        name="Search"
        placeholder="Search..."
        className={styles.search}
      />
      <Link href="#">
        <a className={styles.button}>Account</a>
      </Link>
    </div>
  );
};

export default Navbar;
