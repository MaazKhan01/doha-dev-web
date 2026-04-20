"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { PAGES_QUERY } from "@/utils/graphQueries";
import { useLoader } from "@/context/LoadingProvider";

import Navbar from "../home/Navbar";
import SideNavDots from "../home/SideNavDots";
import Footer from "../home/Footer";
import styles from "../home/HomePage.module.css";

const HeroSlider = dynamic(() => import("../home/HeroSlider"));
const AboutQatarSection = dynamic(() => import("../home/AboutQatarSection"));
const AboutDoha2030Section = dynamic(() => import("../home/AboutDoha2030Section"));
const MediaGridLayout = dynamic(() => import("../home/MediaGridLayout"));
const GallerySection = dynamic(() => import("../home/GallerySection"));
const ContentGridSectionLayout = dynamic(() => import("../home/ContentGridSectionLayout"));
const TabsContentLayout = dynamic(() => import("../home/TabsContentLayout"));
const SportsVenuesSection = dynamic(() => import("../home/SportsVenuesSection"));

const TRANSITION = "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)";

const DynamicComponent = ({ id }) => {
  const [dataset, setDataset] = useState([]);
  const { setLoad } = useLoader();

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("down");
  const isScrollingRef = useRef(false);
  const containerRef = useRef(null);
  const touchStartYRef = useRef(null);

  const { loading, error, data } = useQuery(
    gql`${PAGES_QUERY}`,
    {
      variables: { id: Number(id) },
      onError: (err) => {
        console.error("GraphQL Error:", err);
        setLoad(false);
      },
    }
  );

  useEffect(() => {
    if (!loading && data) {
      setDataset(data?.page?.flexibleContent?.component || []);
      setLoad(false);
    } else if (!loading && error) {
      setLoad(false);
    }
  }, [loading, data, error, id, setLoad]);

  // Clear prevIndex after transition ends
  useEffect(() => {
    if (prevIndex === null) return;
    const t = setTimeout(() => setPrevIndex(null), 850);
    return () => clearTimeout(t);
  }, [prevIndex]);

  const SECTIONS = dataset.map((item, index) => {
    const type = item?.__typename;
    let label = "Section";
    let sectionId = `section-${index}`;
    if (type === "FlexibleContentComponentVideoBannerSectionLayout") { sectionId = "home"; label = "Home"; }
    else if (type === "FlexibleContentComponentGuideSectionLayout") { sectionId = "about-qatar"; label = "About Qatar"; }
    else if (type === "FlexibleContentComponentContentSectionLayout") { sectionId = "doha2030"; label = "Doha 2030"; }
    else if (type === "FlexibleContentComponentCallToActionLayout") { sectionId = "gallery"; label = "Gallery"; }
    else if (type === "FlexibleContentComponentPressReleaseSectionLayout") { sectionId = "press-releases"; label = "Press Releases"; }
    else if (type === "FlexibleContentComponentContentSection2Layout") { sectionId = "sports-venues"; label = "Sports and Venues"; }
    return { id: sectionId, label, type };
  });

  const activeSectionId = SECTIONS[activeIndex]?.id;
  const DARK_BG_SECTIONS = ["home", "about-qatar", "gallery"];

  const navigate = useCallback((dir) => {
    if (isScrollingRef.current) return;
    const total = dataset.length;
    if (total === 0) return;

    if (dir === "down") {
      setActiveIndex((prev) => {
        if (prev >= total - 1) return prev;
        isScrollingRef.current = true;
        setPrevIndex(prev);
        setDirection("down");
        setTimeout(() => { isScrollingRef.current = false; }, 850);
        return prev + 1;
      });
    } else {
      setActiveIndex((prev) => {
        if (prev <= 0) return prev;
        isScrollingRef.current = true;
        setPrevIndex(prev);
        setDirection("up");
        setTimeout(() => { isScrollingRef.current = false; }, 850);
        return prev - 1;
      });
    }
  }, [dataset.length]);

  const scrollTimeRef = useRef(0);

  const handleWheel = useCallback((e) => {
    if (isScrollingRef.current) {
      e.preventDefault();
      return;
    }

    const activeSlideEl = containerRef.current?.querySelector(`[data-slide-index="${activeIndex}"]`);

    if (activeSlideEl) {
      const { scrollTop, scrollHeight, clientHeight } = activeSlideEl;
      if (scrollHeight > clientHeight + 2) {
        const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
        const atTop = scrollTop <= 2;

        // If native scrolling is possible in the wheel's direction
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          scrollTimeRef.current = Date.now(); 
          return; // Let browser scroll it naturally
        }

        // We hit the boundary. If the user was just scrolling within the last 500ms,
        // it's likely the inertial tail of the trackpad. Swallow it.
        if (Date.now() - scrollTimeRef.current < 500) {
          e.preventDefault();
          scrollTimeRef.current = Date.now(); // keep swallowing as long as inertia continues
          return;
        }
      }
    }

    e.preventDefault();
    if (e.deltaY > 0) navigate("down");
    else navigate("up");
  }, [navigate, activeIndex]);

  const handleTouchStart = useCallback((e) => {
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    touchStartYRef.current = null;
    if (Math.abs(deltaY) < 30) return;

    if (isScrollingRef.current) return;

    const activeSlideEl = containerRef.current?.querySelector(`[data-slide-index="${activeIndex}"]`);
    if (activeSlideEl) {
      const { scrollTop, scrollHeight, clientHeight } = activeSlideEl;
      if (scrollHeight > clientHeight + 2) {
        const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
        const atTop = scrollTop <= 2;

        if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) {
          return; // Browser handled the swipe natively
        }
      }
    }

    if (deltaY > 0) navigate("down");
    else navigate("up");
  }, [navigate, activeIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

  const scrollToId = (sectionId) => {
    const idx = SECTIONS.findIndex((s) => s.id === sectionId);
    if (idx === -1 || idx === activeIndex) return;
    const dir = idx > activeIndex ? "down" : "up";
    setPrevIndex(activeIndex);
    setDirection(dir);
    setActiveIndex(idx);
  };

  /*
   * Slide state logic:
   *
   * SCROLLING DOWN (new slide comes up from bottom):
   *   - entering (activeIndex): translateY(100%) → translateY(0)   [animated]
   *   - leaving  (prevIndex):   translateY(0)   → stays at 0       [no exit needed, covered]
   *   - past slides:            parked at translateY(-100%)         [instant, no transition]
   *   - future slides:          parked at translateY(100%)          [instant, no transition]
   *
   * SCROLLING UP (current slide exits down, previous slide comes back from above):
   *   - entering (activeIndex): translateY(-100%) → translateY(0)  [animated — was above]
   *   - leaving  (prevIndex):   translateY(0) → translateY(100%)   [animated — exits down]
   *   - past slides:            parked at translateY(-100%)         [instant, no transition]
   *   - future slides:          parked at translateY(100%)          [instant, no transition]
   */
  const getSlideStyle = (idx) => {
    const isActive = idx === activeIndex;
    const isLeaving = idx === prevIndex;

    if (isActive) {
      // Where does the entering slide START before animating in?
      // Down scroll → enters from bottom (100%), Up scroll → enters from top (-100%)
      // But we can't set the start position here since React batches state.
      // Solution: active slide always targets translateY(0) with transition.
      // The "pre-position" is handled by the fact that idle slides are already
      // parked above/below before they ever become active.
      return {
        zIndex: 2,
        transform: "translateY(0)",
        transition: TRANSITION,
      };
    }

    if (isLeaving) {
      // Leaving slide animates OUT:
      // Down scroll → old slide stays put (new one covers it from below) — no exit animation needed
      // Up scroll   → old slide exits DOWN to reveal the one above
      return {
        zIndex: direction === "up" ? 3 : 1,
        transform: direction === "up" ? "translateY(100%)" : "translateY(0)",
        transition: direction === "up" ? TRANSITION : "none",
      };
    }

    // Idle: instantly park above or below, no transition so repositioning is invisible
    return {
      zIndex: 0,
      transform: idx < activeIndex ? "translateY(-100%)" : "translateY(100%)",
      transition: "none",
    };
  };

  const renderComponent = (item, idx) => {
    const typename = item?.__typename;
    switch (typename) {
      case "FlexibleContentComponentVideoBannerSectionLayout": return <HeroSlider pageNo={id} idx={idx} />;
      case "FlexibleContentComponentGuideSectionLayout": return <AboutQatarSection pageNo={id} idx={idx} />;
      case "FlexibleContentComponentContentSectionLayout": return <AboutDoha2030Section pageNo={id} idx={idx} />;
      case "FlexibleContentComponentMediaGridLayout": return <MediaGridLayout pageNo={id} idx={idx} />;
      case "FlexibleContentComponentCallToActionLayout": return <GallerySection pageNo={id} idx={idx} />;
      case "FlexibleContentComponentPressReleaseSectionLayout": return <ContentGridSectionLayout pageNo={id} idx={idx} />;
      case "FlexibleContentComponentTabsContentLayout": return <TabsContentLayout pageNo={id} idx={idx} />;
      case "FlexibleContentComponentContentSection2Layout": return <SportsVenuesSection pageNo={id} idx={idx} />;
      default: return null;
    }
  };

  if (loading && dataset.length === 0) return null;

  return (
    <div className={styles.outerContainer} ref={containerRef}>
      <Navbar onSectionClick={scrollToId} activeSectionId={activeSectionId} />
      <SideNavDots
        sections={SECTIONS}
        activeSection={activeSectionId}
        onDotClick={scrollToId}
        darkSections={DARK_BG_SECTIONS}
      />

      <div className={styles.innerSlider}>
        {dataset.map((item, idx) => (
          <div
            key={idx}
            data-slide-index={idx}
            className={styles.slideItem}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              willChange: "transform",
              overflowY: "auto",
              ...getSlideStyle(idx),
            }}
          >
            {idx === dataset.length - 1 ? (
              <div className={styles.galleryFooterPanel}>
                {renderComponent(item, idx)}
                <Footer />
              </div>
            ) : (
              renderComponent(item, idx)
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicComponent;