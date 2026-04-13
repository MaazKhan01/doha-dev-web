"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    id: "slide-1",
    video: "https://agdoha2030.qa/themes/doha2030/videos/spot-video.webm",
    bg: "https://images.unsplash.com/photo-1576788369575-4e47c3d6f4e2?w=1920&q=80",
    headline: ["DOHA 2030", "YOUR GATEWAY"],
    sub: "21ST ASIAN GAMES HOST CITY",
  },
  // {
  //   id: "slide-2",
  //   bg: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80",
  //   headline: ["A LEGACY", "FOR ASIA"],
  //   sub: "CELEBRATING SPORT · CULTURE · EXCELLENCE",
  // },
  // {
  //   id: "slide-3",
  //   bg: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80",
  //   headline: ["WELCOME TO", "QATAR"],
  //   sub: "WHERE TRADITION MEETS THE FUTURE",
  // },
];

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

/* Doha 2030 emblem SVG (geometric halftone circles) */
function EmblemSVG() {
  return (
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblem}>
      {/* Outer geometric ring */}
      <circle cx="140" cy="140" r="130" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      <circle cx="140" cy="140" r="105" stroke="white" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
      {/* Wavy pattern rows */}
      {[...Array(10)].map((_, r) =>
        [...Array(10)].map((_, c) => {
          const size = 3 + Math.sin((r + c) * 0.7) * 2;
          const x = 30 + c * 22;
          const y = 30 + r * 22;
          const dx = x - 140, dy = y - 140;
          if (Math.sqrt(dx * dx + dy * dy) > 115) return null;
          return <circle key={`${r}-${c}`} cx={x} cy={y} r={Math.max(0.5, size)} fill="white" opacity={0.15 + (size / 10)} />;
        })
      )}
      {/* Star of 8 points */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 140 + Math.cos(angle) * 55;
        const y1 = 140 + Math.sin(angle) * 55;
        const x2 = 140 + Math.cos(angle + Math.PI / 8) * 75;
        const y2 = 140 + Math.sin(angle + Math.PI / 8) * 75;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" opacity="0.5" />;
      })}
      {/* Center sun burst */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const inner = i % 2 === 0 ? 8 : 5;
        const outer = i % 2 === 0 ? 28 : 18;
        return (
          <line
            key={`sun-${i}`}
            x1={140 + Math.cos(angle) * inner}
            y1={140 + Math.sin(angle) * inner}
            x2={140 + Math.cos(angle) * outer}
            y2={140 + Math.sin(angle) * outer}
            stroke="white"
            strokeWidth="1.5"
            opacity="0.8"
          />
        );
      })}
      <circle cx="140" cy="140" r="6" fill="white" opacity="0.9" />
    </svg>
  );
}

export default function HeroSlider() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const sliderRef = React.useRef(null);

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

      {/* Doha 2030 logo emblem overlay */}
      <div className={styles.logoOverlay}>
        <img src="/en/images/logoWhite.svg" alt="Logo" width={275} className="hidden md:block mt-16" />
      </div>

      {/* Mute / play controls */}
      <div className={styles.controls}>
        <button 
          className={styles.controlBtn} 
          onClick={toggleMute} 
          aria-label="Toggle mute"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button 
          className={styles.controlBtn} 
          onClick={togglePlay} 
          aria-label="Play/Pause"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </section>
  );
}
