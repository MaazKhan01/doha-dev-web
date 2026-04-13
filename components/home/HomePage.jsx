"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar              from "./Navbar";
import SideNavDots         from "./SideNavDots";
import HeroSlider          from "./HeroSlider";
import AboutQatarSection   from "./AboutQatarSection";
import AboutDoha2030Section from "./AboutDoha2030Section";
import SportsVenuesSection from "./SportsVenuesSection";
import PressReleasesSection from "./PressReleasesSection";
import GallerySection       from "./GallerySection";
import Footer               from "./Footer";

import styles from "./HomePage.module.css";

const SECTIONS = [
  { id: "home",           label: "Home" },
  { id: "about-qatar",    label: "About Qatar" },
  { id: "doha2030",       label: "Doha 2030" },
  { id: "sports-venues",  label: "Sports & Venues" },
  { id: "press-releases", label: "Press Releases" },
  { id: "gallery",        label: "Gallery" },
];

const DARK_BG_SECTIONS = ["home", "about-qatar", "gallery"];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  const activeSectionId = SECTIONS[activeIndex]?.id;

  const handleWheel = useCallback((e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      // scroll down
      if (activeIndex < SECTIONS.length - 1) {
        setIsScrolling(true);
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => setIsScrolling(false), 800); // Wait for transition
      }
    } else if (e.deltaY < 0) {
      // scroll up
      if (activeIndex > 0) {
        setIsScrolling(true);
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => setIsScrolling(false), 800);
      }
    }
  }, [activeIndex, isScrolling]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      handleWheel(e);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [handleWheel]);

  // Navigate to an index manually via nav dots
  const scrollToId = (id) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx !== -1) setActiveIndex(idx);
  };

  return (
    <>
      <Navbar onSectionClick={scrollToId} />

      <SideNavDots
        sections={SECTIONS}
        activeSection={activeSectionId}
        onDotClick={scrollToId}
        darkSections={DARK_BG_SECTIONS}
      />

      {/* Main outer container handles wheel events & hides overflow */}
      <div className={styles.outerContainer} ref={containerRef}>
        
        {/* Inner container slides up/down */}
        <div 
          className={styles.innerSlider} 
          style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
        >
          {/* Each item here takes 100vh */}
          <div className={styles.slideItem}><HeroSlider /></div>
          <div className={styles.slideItem}><AboutQatarSection /></div>
          <div className={styles.slideItem}><AboutDoha2030Section /></div>
          <div className={styles.slideItem}><SportsVenuesSection /></div>
          <div className={styles.slideItem}><PressReleasesSection /></div>
          
          <div className={styles.slideItem}>
            <div className={styles.galleryFooterPanel}>
              <GallerySection />
              <Footer />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
