"use client";
import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { gql, useQuery } from "@apollo/client";
import { FaPlay } from "react-icons/fa";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import { useLanguage } from "@/context/LanguageProvider";
import { languageSelector, imageSelector } from "@/utils/functions";
import { VIDEO_GALLERY_QUERY } from "@/utils/graphQueries";
import { buildWpUrl } from "@/utils/buildWpUrl";
import LogoLoader from "@/components/ui/LogoLoader";
import styles from "./VideoGallery.module.css";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([^"&?/\s]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return null;
}

// Guard so buildWpUrl is only called when a real URL exists
function safeUrl(rawUrl) {
  return rawUrl ? buildWpUrl(rawUrl) : null;
}

export default function VideoGallery() {
  const { lng } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { data, loading } = useQuery(gql`${VIDEO_GALLERY_QUERY}`);

  const bannerSection = data?.page?.flexibleContent?.bannerSection;
  const components = data?.page?.flexibleContent?.component || [];
  const mediaGrid = components.find((c) => c?.fieldGroupName?.includes("MediaGridLayout"));
  const videos = mediaGrid?.videoDetails || [];

  const bannerTitle =
    languageSelector(lng, bannerSection?.bannerTitleEn, bannerSection?.bannerTitleAr) ||
    "Video Gallery";
  const bannerImage = safeUrl(
    imageSelector(
      lng,
      bannerSection?.bannerBackgroundImageEn?.node?.mediaItemUrl,
      bannerSection?.bannerBackgroundImageAr?.node?.mediaItemUrl
    )
  );

  const handleKey = useCallback((e) => {
    if (e.key === "Escape") setSelectedVideo(null);
  }, []);

  useEffect(() => {
    if (!selectedVideo) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo, handleKey]);

  // Determine the modal video source for the selected video
  const modalSource = (() => {
    if (!selectedVideo) return null;
    const isYouTube = selectedVideo.videoSourceType?.includes("YouTube");
    if (isYouTube) {
      return { type: "embed", url: getYouTubeEmbedUrl(selectedVideo.videoUrl) };
    }
    const localUrl = safeUrl(selectedVideo.uploadVideo?.node?.mediaItemUrl);
    if (localUrl) return { type: "video", url: localUrl };
    // Fallback: try videoUrl as a direct embed
    return { type: "embed", url: selectedVideo.videoUrl || null };
  })();

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title={bannerTitle}
        image={bannerImage}
      />

      <div className="innerPage-emblem py-12">
        <main className={styles.mainContent}>
          {loading && videos.length === 0 ? (
            <LogoLoader />
          ) : (
            <div className={styles.grid}>
              {videos.map((video, i) => {
                const rawThumb = video?.videoThumbnail?.node?.mediaItemUrl;
                const thumb = rawThumb ? buildWpUrl(rawThumb) : null;

                return (
                  <div
                    key={i}
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
                      {thumb ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={thumb}
                          alt={video.videoTitle || ""}
                          className={styles.cardImg}
                        />
                      ) : (
                        <div className={styles.cardImgPlaceholder} />
                      )}
                      <div className={styles.playIcon}>
                        <FaPlay size={20} />
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                       {video.postDate && (
                        <span className={styles.cardDate}>Post on {video.postDate}</span>
                      )}
                      <h3 className={styles.cardTitle}>{video.videoTitle}</h3>
                     
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

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
            {modalSource?.type === "video" ? (
              /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <video
                className={styles.videoIframe}
                src={modalSource.url}
                autoPlay
                controls
              />
            ) : modalSource?.url ? (
              <iframe
                className={styles.videoIframe}
                src={modalSource.url}
                title={selectedVideo.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.noUrl}>Video URL not available</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
