"use client";
import styles from "./Footer.module.css";
import { gql, useQuery } from "@apollo/client";
import { FOOTER } from "@/utils/graphQueries";
export default function Footer() {
    const { loading, data } = useQuery(
      gql`
        ${FOOTER}
      `
    );
  const footerFields = data?.footer?.footerFields;
  const footerText = footerFields?.footerText || "All Rights Reserved to Doha 2030";
  const footerLinksArr = footerFields?.footerLinks || [];

  if (loading) return null;

  return (
    <footer className={styles.footer}>
      <div className="container">
      <p className={styles.copy}>{footerText}</p>
        <div className={styles.links}>
          {footerLinksArr.map((link, index) => (
            <span key={index}>
              <a href={link.urlEn} className={styles.link}>{link.textEn}</a>
              {index < footerLinksArr.length - 1 && <span className={styles.divider}>|</span>}
            </span>
          ))}
      </div>
      </div>
    </footer>
  );
}

