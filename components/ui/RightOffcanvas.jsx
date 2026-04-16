"use client";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./RightOffcanvas.module.css";

/**
 * RightOffcanvas — shared drawer component.
 *
 * Props:
 *   open     {boolean}  Whether the panel is visible
 *   onClose  {function} Called to close the panel
 *   image    {string}   Background image URL for the top hero area
 *   tag      {string}   Optional coloured pill label
 *   heading  {string}   Bold title inside the drawer
 *   date     {string}   Optional date string
 *   children {node}     Scrollable body content (text, JSX, etc.)
 */
export default function RightOffcanvas({ open, onClose, image, tag, heading, date, children }) {
  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={heading || "Details"}
      >
        {/* Close × */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Top image */}
        {image && (
          <div
            className={styles.heroImgDiv}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          />
        )}

        {/* Scrollable content */}
        <div className={styles.body}>
          {tag   && <span className={styles.tag}>{tag}</span>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {date  && <span className={styles.date}>{date}</span>}
          <div className={styles.divider} aria-hidden="true" />
          <div className={styles.content}>{children}</div>
        </div>
      </aside>
    </>,
    document.body
  );
}
