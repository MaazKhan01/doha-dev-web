"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { PAGES_QUERY } from "@/utils/graphQueries";
import { useLoader } from "@/context/LoadingProvider";

// Layout Imports
import Navbar from "../home/Navbar";
import SideNavDots from "../home/SideNavDots";
import Footer from "../home/Footer";
import styles from "../home/HomePage.module.css";

// ─── Dynamic Imports (code-split per component) ─────────────────────────────
const HeroSlider = dynamic(() => import("../home/HeroSlider"));
const AboutQatarSection = dynamic(() => import("../home/AboutQatarSection"));
const AboutDoha2030Section = dynamic(() => import("../home/AboutDoha2030Section"));
const MediaGridLayout = dynamic(() => import("../home/MediaGridLayout"));
const GallerySection = dynamic(() => import("../home/GallerySection"));
const ContentGridSectionLayout = dynamic(() => import("../home/ContentGridSectionLayout"));
const TabsContentLayout = dynamic(() => import("../home/TabsContentLayout"));

const DynamicComponent = ({ id }) => {
  const [dataset, setDataset] = useState([]);
  const { setLoad } = useLoader();

  // Scroll States
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);

  const { loading, error, data } = useQuery(
    gql`
      ${PAGES_QUERY}
    `,
    {
      variables: { id: Number(id) },
      onError: (err) => {
        console.error("GraphQL Error in DynamicComponent:", err);
        setLoad(false);
      }
    }
  );
  
  useEffect(() => {
    if (!loading && data) {
      const components = data?.page?.flexibleContent?.component || [];
      setDataset(components);
      setLoad(false);
    } else if (!loading && error) {
      setLoad(false);
    }
  }, [loading, data, error, id, setLoad]);

  // Generate dynamic sections for navigation
  const SECTIONS = dataset.map((item, index) => {
    const type = item?.__typename;
    let label = "Section";
    let id = `section-${index}`;

    if (type === "FlexibleContentComponentVideoBannerSectionLayout") { id = "home"; label = "Home"; }
    else if (type === "FlexibleContentComponentGuideSectionLayout") { id = "about-qatar"; label = "About Qatar"; }
    else if (type === "FlexibleContentComponentContentSectionLayout") { id = "doha2030"; label = "Doha 2030"; }
    else if (type === "FlexibleContentComponentCallToActionLayout") { id = "gallery"; label = "Gallery"; }
    else if (type === "FlexibleContentComponentContentGridSectionLayout") { id = "grid"; label = "Updates"; }

    return { id, label, type };
  });

  const activeSectionId = SECTIONS[activeIndex]?.id;
  const DARK_BG_SECTIONS = ["home", "about-qatar", "gallery"];

  const handleWheel = useCallback((e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      if (activeIndex < dataset.length - 1) {
        setIsScrolling(true);
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => setIsScrolling(false), 800);
      }
    } else if (e.deltaY < 0) {
      if (activeIndex > 0) {
        setIsScrolling(true);
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => setIsScrolling(false), 800);
      }
    }
  }, [activeIndex, isScrolling, dataset.length]);

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

  const scrollToId = (id) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx !== -1) setActiveIndex(idx);
  };

  const renderComponent = (item, idx) => {
    const typename = item?.__typename;
    
    switch (typename) {
      case "FlexibleContentComponentVideoBannerSectionLayout":
        return <HeroSlider pageNo={id} idx={idx} />;
      case "FlexibleContentComponentGuideSectionLayout":
        return <AboutQatarSection pageNo={id} idx={idx} />;
      case "FlexibleContentComponentContentSectionLayout":
        return <AboutDoha2030Section pageNo={id} idx={idx} />;
      case "FlexibleContentComponentMediaGridLayout":
        return <MediaGridLayout pageNo={id} idx={idx} />;
      case "FlexibleContentComponentCallToActionLayout":
        return <GallerySection pageNo={id} idx={idx} />;
      case "FlexibleContentComponentContentGridSectionLayout":
        return <ContentGridSectionLayout pageNo={id} idx={idx} />;
      case "FlexibleContentComponentTabsContentLayout":
        return <TabsContentLayout pageNo={id} idx={idx} />;
      default:
        console.warn(`No mapping found for component: ${typename}`);
        return null;
    }
  };

  if (loading && dataset.length === 0) return null;

  return (
    <div className={styles.outerContainer} ref={containerRef}>
      <Navbar onSectionClick={scrollToId} />
      
      <SideNavDots
        sections={SECTIONS}
        activeSection={activeSectionId}
        onDotClick={scrollToId}
        darkSections={DARK_BG_SECTIONS}
      />

      <div 
        className={styles.innerSlider} 
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        {dataset.map((item, idx) => (
          <div key={idx} className={styles.slideItem}>
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
