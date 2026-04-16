"use client";
import React, { useState } from "react";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import styles from "./ImageGalleryDetail.module.css";
import { createPortal } from "react-dom";

// Mock data mapping slugs to photos
const ALBUM_DATA = {
  "OCA-Evaluation-day2": {
    title: "OCA Evaluation Committee visit - Day 2",
    date: "12 Nov 2020",
    banner: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=900&q=80",
      "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?w=900&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80"
    ]
  },
  // Fallback for other slugs (just for demo purposes)
  "default": {
    title: "Gallery Album",
    date: "2024",
    banner: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80"
    ]
  }
};

export default function ImageGalleryDetail({ slug }) {
  const album = ALBUM_DATA[slug] || ALBUM_DATA["default"];
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close lightbox on Escape
  React.useEffect(() => {
    if (!selectedPhoto) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind lightbox
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title={album.title}
        eyebrow="Media / Image Gallery"
        image={album.banner}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Image Gallery", href: "/en/image-gallery" }, // generic lang path for breadcrumb
          { label: "Album" },
        ]}
      />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>{album.title}</h2>
          <span className={styles.dateTag}>Published: {album.date}</span>
        </div>

        <div className={styles.grid}>
          {album.photos.map((photoUrl, idx) => (
            <div
              key={idx}
              className={styles.imgWrap}
              onClick={() => setSelectedPhoto(photoUrl)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPhoto(photoUrl);
                }
              }}
            >
              <div
                className={styles.imgInner}
                style={{ backgroundImage: `url(${photoUrl})` }}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox rendered via Portal */}
      {selectedPhoto && createPortal(
        <div 
          className={styles.lightbox} 
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className={styles.lightboxClose}
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img 
            src={selectedPhoto} 
            alt="Expanded gallery view" 
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()} // don't close when clicking image itself
          />
        </div>,
        document.body
      )}
    </div>
  );
}
