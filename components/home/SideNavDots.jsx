"use client";
import styles from "./SideNavDots.module.css";

export default function SideNavDots({ sections, activeSection, onDotClick, darkSections }) {
  const isDark = darkSections.includes(activeSection);

  return (
    <nav className={`${styles.nav} ${isDark ? styles.navDark : styles.navLight}`} aria-label="Page sections">
      {sections.map((s) => (
        <button
          key={s.id}
          id={`dot-${s.id}`}
          className={`${styles.dotItem} ${activeSection === s.id ? styles.dotItemActive : ""}`}
          onClick={() => onDotClick(s.id)}
          title={s.label}
          aria-label={`Go to ${s.label}`}
        >
          {/* <span className={styles.label}>{s.label}</span> */}
          <span className={styles.dot} />
        </button>
      ))}
    </nav>
  );
}
