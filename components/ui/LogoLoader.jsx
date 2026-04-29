"use client";
import styles from "./LogoLoader.module.css";

export default function LogoLoader({ fullScreen = false }) {
  return (
    <div className={`${styles.wrap} ${fullScreen ? styles.fullScreen : styles.inline}`}>
      <div className={styles.ring}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/en/images/logo.svg" alt="Loading" className={styles.logo} />
      </div>
    </div>
  );
}
