import Link from "next/link";
import styles from "@/components/module/NotFoundPage.module.css";

// Server component — no client hooks, no Apollo.
// Rendered when Next.js can't match a route at all.
export default function GlobalNotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.pattern} aria-hidden="true" />

      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/en/images/logo.svg" alt="Doha 2030" className={styles.logo} />

        <div className={styles.code} aria-hidden="true">404</div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link href="/en" className={styles.btnPrimary}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
