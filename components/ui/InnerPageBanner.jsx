"use client";
import Link from "next/link";
import styles from "./InnerPageBanner.module.css";

/**
 * InnerPageBanner — generic top hero for inner pages.
 *
 * Props:
 *   title        {string}  Required. Main heading.
 *   eyebrow      {string}  Optional. Small label above the title.
 *   image        {string}  Optional. Background image URL.
 *   breadcrumbs  {Array}   Optional. Array of { label, href? }.
 *                          Last item auto-renders as current (no link).
 *   overlayColor {string}  Optional. Custom CSS for overlay gradient.
 *   height       {string}  Optional. Banner height, default "360px".
 */
export default function InnerPageBanner({
  title,
  eyebrow,
  image,
  breadcrumbs = [],
  overlayColor,
  height,
}) {
  const bgStyle = image
    ? { backgroundImage: `url(${image})` }
    : { background: "#1a0a0a" };

  return (
    <>
      {/* ── Hero Banner ─────────────────────────── */}
      <div
        className={styles.banner}
        style={height ? { height } : undefined}
        role="banner"
      >
        <div className={styles.bg} style={bgStyle} aria-hidden="true" />
        <div
          className={styles.overlay}
          style={overlayColor ? { background: overlayColor } : undefined}
          aria-hidden="true"
        />
        <div className={styles.content}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.accent} aria-hidden="true" />
        </div>
      </div>

      {/* ── Breadcrumb ──────────────────────────── */}
      {breadcrumbs.length > 0 && (
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                {i > 0 && <span className={styles.breadcrumbSep}>›</span>}
                {isLast || !crumb.href ? (
                  <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href}>{crumb.label}</Link>
                )}
              </span>
            );
          })}
        </nav>
      )}
    </>
  );
}
