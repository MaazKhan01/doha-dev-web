"use client";
import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaPlay } from "react-icons/fa";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import styles from "./VideoGallery.module.css";

const VIDEOS = [
  {
    id: "v1",
    title: "Doha 2030 Asian Games Bid - Official Video",
    date: "10 Nov 2020",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80",
    youtubeId: "dQw4w9WgXcQ" // Example placeholder
  },
  {
    id: "v2",
    title: "Welcome to Doha - A Gateway to the Future",
    date: "15 Oct 2020",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
    youtubeId: "9bZkp7q19f0"
  },
  {
    id: "v3",
    title: "World-Class Sports Venues Overview",
    date: "05 Sep 2020",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80",
    youtubeId: "y6120QOlsfU"
  },
  {
    id: "v4",
    title: "Athletes Endorse Doha 2030 Bid",
    date: "20 Aug 2020",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
    youtubeId: "3JZ_D3ELwOQ"
  },
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Close modal on Escape
  const handleKey = useCallback((e) => {
    if (e.key === "Escape") setSelectedVideo(null);
  }, []);

  useEffect(() => {
    if (!selectedVideo) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // Prevent background scroll
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo, handleKey]);

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title="Video Gallery"
        eyebrow="Media"
        image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Video Gallery" },
        ]}
      />

      <main className={styles.mainContent}>
        <div className={styles.grid}>
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className={styles.card}
              onClick={() => setSelectedVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedVideo(video);
                }
              }}
            >
              <div className={styles.cardImgWrap}>
                <div
                  className={styles.cardImg}
                  style={{ backgroundImage: `url(${video.image})` }}
                />
                <div className={styles.playIcon}>
                  <FaPlay />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{video.title}</h3>
                <span className={styles.cardDate}>{video.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal via Portal */}
      {selectedVideo && createPortal(
        <div 
          className={styles.modalOverlay} 
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className={styles.modalClose}
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
          >
            ✕
          </button>
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className={styles.videoIframe}
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
