"use client";
import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import { gql, useQuery } from "@apollo/client";
import { HERO_BANNER_QUERY } from "@/utils/graphQueries";
import styles from "./HeroSlider.module.css";

const slickSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 900,
  fade: true,
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
  pauseOnHover: false,
  arrows: false,
};

export default function HeroSlider({ pageNo, idx }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = React.useRef(null);

  const { data: queryData, loading } = useQuery(gql`${HERO_BANNER_QUERY}`, {
    variables: { id: pageNo.toString() },
    skip: !pageNo
  });

  // Extract component data at specific index
  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  const toggleMute = () => setIsMuted((m) => !m);

  const togglePlay = () => {
    setIsPlaying((p) => {
      const nextPlay = !p;
      const videos = document.querySelectorAll('video');
      videos.forEach((vid) => {
        if (nextPlay) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
      
      if (sliderRef.current) {
        if (nextPlay) sliderRef.current.slickPlay();
        else sliderRef.current.slickPause();
      }
      
      return nextPlay;
    });
  };

  const slides = useMemo(() => {
    if (cmsData) {
      const videoPath = cmsData.videoUrlDesktop?.node?.mediaItemUrl || cmsData.videoUrlDesktop?.node?.filePath;
      const absoluteVideo = (videoPath && !videoPath.startsWith('http')) 
        ? `${process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, '')}${videoPath}` 
        : videoPath;

      return [{
        id: "hero-cms",
        video: absoluteVideo,
        headline: [],
        sub: ""
      }];
    }
    return [
      {
        id: "slide-1",
        video: "https://agdoha2030.qa/themes/doha2030/videos/spot-video.webm",
        bg: "https://images.unsplash.com/photo-1576788369575-4e47c3d6f4e2?w=1920&q=80",
        headline: ["DOHA 2030", "YOUR GATEWAY"],
        sub: "21ST ASIAN GAMES HOST CITY",
      }
    ];
  }, [cmsData]);

  if (loading && !cmsData) return null;

  return (
    <section id="home" className={styles.section}>
      <div className={styles.sliderWrap}>
        <Slider ref={sliderRef} {...slickSettings}>
          {slides.map((slide) => (
            <div key={slide.id} className={styles.slide}>
              {slide.video ? (
                <video
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  src={slide.video}
                  className={styles.slideVideo}
                />
              ) : (
                <div
                  className={styles.slideBg}
                  style={{ backgroundImage: `url(${slide.bg})` }}
                />
              )}
              <div className={styles.slideOverlay} />
              <div className={styles.slideContent}>
                {slide.headline.map((line, i) => (
                  <span key={i} className={styles.headlineLine}>{line}</span>
                ))}
                <p className={styles.slideSub}>{slide.sub}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.logoOverlay}>
        <img src="/en/images/logoWhite.svg" alt="Logo" width={375} className="hidden md:block" />
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={toggleMute} aria-label="Toggle mute">
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button className={styles.controlBtn} onClick={togglePlay} aria-label="Play/Pause">
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </section>
  );
}
