"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
      <p className={styles.copy}>All Rights Reserved to Doha 2030</p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Terms of Use Policy</a>
        <span className={styles.divider}>|</span>
        <a href="#" className={styles.link}>Privacy Policy</a>
      </div>
      </div>
    </footer>
  );
}
