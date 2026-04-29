"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const params = useParams();
  const lang = params?.lang || "en";

  return (
    <div className={styles.wrap}>
      {/* Background pattern */}
      <div className={styles.pattern} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/en/images/logoWhite.svg" alt="Doha 2030" className={styles.logo} />

        {/* 404 number */}
        <div className={styles.code} aria-hidden="true">404</div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link href={`/${lang}`} className={styles.btnPrimary}>
            Back to Home
          </Link>
          <button onClick={() => window.history.back()} className={styles.btnSecondary}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
