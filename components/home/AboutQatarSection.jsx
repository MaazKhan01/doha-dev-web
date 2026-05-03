"use client";
import { useState, useMemo, useEffect } from "react";
import styles from "./AboutQatarSection.module.css";
import { gql, useQuery } from "@apollo/client";
import { ABOUT_QATAR } from "@/utils/graphQueries";

function buildImageUrl(node) {
  if (!node) return null;
  const { mediaItemUrl, filePath } = node;
  if (mediaItemUrl?.startsWith("http")) return mediaItemUrl;
  const base = process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "") || "";
  return `${base}${mediaItemUrl || filePath || ""}`;
}

function ImageCarousel({ nodes = [], animating, label }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => { setImgIdx(0); }, [nodes]);

  const hasMultiple = nodes.length > 1;
  const imgUrl = buildImageUrl(nodes[imgIdx]);

  const prev = (e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + nodes.length) % nodes.length); };
  const next = (e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % nodes.length); };

  return (
    <div className={styles.imageWrap}>
      <div
        className={`${styles.image} ${animating ? styles.imageOut : styles.imageIn}`}
        style={{ backgroundImage: `url(${imgUrl})` }}
      />

      {hasMultiple && (
        <>
          <button className={`${styles.imgArrow} ${styles.imgArrowLeft}`} onClick={prev} aria-label="Previous image">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className={`${styles.imgArrow} ${styles.imgArrowRight}`} onClick={next} aria-label="Next image">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
        </>
      )}

      {label && <div className={styles.imageLabel}>{label}</div>}
    </div>
  );
}

function AccordionImageCarousel({ nodes = [] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasMultiple = nodes.length > 1;
  const imgUrl = buildImageUrl(nodes[imgIdx]);

  if (!imgUrl) return null;

  return (
    <div className={styles.accordionImgWrap}>
      <div className={styles.accordionImg} style={{ backgroundImage: `url(${imgUrl})` }} />
      {hasMultiple && (
        <>
          <button
            className={`${styles.imgArrow} ${styles.imgArrowLeft}`}
            onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + nodes.length) % nodes.length); }}
            aria-label="Previous image"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={`${styles.imgArrow} ${styles.imgArrowRight}`}
            onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % nodes.length); }}
            aria-label="Next image"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className={styles.imgDots}>
            {nodes.map((_, i) => (
              <button
                key={i}
                className={`${styles.imgDot} ${i === imgIdx ? styles.imgDotActive : ""}`}
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AboutQatarSection({ pageNo, idx }) {
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { loading, data } = useQuery(gql`${ABOUT_QATAR}`, {
    variables: { id: pageNo.toString() },
    skip: !pageNo,
  });

  const guides = useMemo(
    () => data?.page?.flexibleContent?.component?.[idx]?.guideRelation?.nodes || [],
    [data, idx]
  );
  const heading = data?.page?.flexibleContent?.component?.[idx]?.sectionTitleEn || "";

  const currentTabs = useMemo(
    () => guides[activeMainTab]?.guideContent?.steps || [],
    [guides, activeMainTab]
  );
  const currentTab = useMemo(
    () => currentTabs[activeSubTab] || null,
    [currentTabs, activeSubTab]
  );

  const handleMainTabChange = (i) => {
    if (i === activeMainTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveMainTab(i);
      setActiveSubTab(0);
      setOpenAccordion(0);
      setAnimating(false);
    }, 300);
  };

  const handleSubTabChange = (i) => {
    if (i === activeSubTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSubTab(i);
      setAnimating(false);
    }, 300);
  };

  if (loading && guides.length === 0) return null;
  if (!loading && guides.length === 0) return null;

  return (
    <section id="about-qatar" className={styles.section}>
      <div style={{ backgroundImage: `url(/en/images/top-emblem.png)` }} className={styles.topEmblem} />

      <div className={styles.innerWrapper}>
        <div className="container mx-auto">
          <h2 className="header-title">{heading}</h2>
        </div>

        <div className={`${styles.mainTabsHeader} container mx-auto`}>
          {guides.map((guide, i) => (
            <button
              key={guide.id}
              className={`${styles.mainTabBtn} ${activeMainTab === i ? styles.mainTabBtnActive : ""}`}
              onClick={() => handleMainTabChange(i)}
            >
              {guide.title}
            </button>
          ))}
        </div>

        <div className={styles.mainContent}>
          <div className={styles.container}>

            {isMobile ? (
              <div className={styles.accordionList}>
                {currentTabs.map((t, i) => {
                  const isOpen = openAccordion === i;
                  const nodes = t.imagesEn?.nodes || [];
                  return (
                    <div key={i} className={styles.accordionItem}>
                      <button
                        className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ""}`}
                        onClick={() => setOpenAccordion(isOpen ? -1 : i)}
                      >
                        <span>{t.headingEn}</span>
                        <svg
                          width={16} height={16} viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth={2.5}
                          style={{ flexShrink: 0, transition: "transform 0.25s", transform: isOpen ? "rotate(180deg)" : "none" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className={styles.accordionBody}>
                          <AccordionImageCarousel nodes={nodes} />
                          {t.descEn && (
                            <div
                              className={styles.accordionDesc}
                              dangerouslySetInnerHTML={{ __html: t.descEn }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.contentArea}>
                <div className={styles.tabsCol}>
                  <div className={styles.tabsColInner}>
                    {currentTabs.map((t, i) => (
                      <button
                        key={i}
                        className={`${styles.tabBtn} ${i === activeSubTab ? styles.tabBtnActive : ""}`}
                        onClick={() => handleSubTabChange(i)}
                      >
                        <span>{t.headingEn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.contentCol}>
                  {currentTab && (
                    <>
                      <ImageCarousel
                        nodes={currentTab.imagesEn?.nodes || []}
                        animating={animating}
                        label={currentTab.headingEn}
                      />
                      <div className={`${styles.descBox} ${animating ? styles.descOut : styles.descIn}`}>
                        <div dangerouslySetInnerHTML={{ __html: currentTab.descEn }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
