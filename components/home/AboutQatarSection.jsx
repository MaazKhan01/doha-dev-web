"use client";
import { useState, useMemo, useEffect } from "react";
import styles from "./AboutQatarSection.module.css";
import { gql, useQuery } from "@apollo/client";
import { ABOUT_QATAR } from "@/utils/graphQueries";

function WavyEmblem() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className={styles.emblem}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <circle key={n} cx="80" cy="300" r={n * 55} fill="none" stroke="white" strokeWidth="1" opacity={0.18 - n * 0.015} />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <circle key={`b${n}`} cx="80" cy="300" r={n * 55 - 27} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 5" opacity={0.1} />
      ))}
    </svg>
  );
}

function buildImageUrl(imageEn) {
  if (!imageEn?.node) return null;
  const { sourceUrl, filePath } = imageEn.node;
  if (sourceUrl?.startsWith("http")) return sourceUrl;
  return `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, "")}${filePath || ""}`;
}

export default function AboutQatarSection({ pageNo, idx }) {
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // accordion open index for mobile (-1 = none open)
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

        {/* Main Tabs — horizontal scroll on all sizes */}
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

            {/* ── MOBILE: accordion ─────────────────────────────────── */}
            {isMobile ? (
              <div className={styles.accordionList}>
                {currentTabs.map((t, i) => {
                  const isOpen = openAccordion === i;
                  const imgUrl = buildImageUrl(t.imageEn);
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
                          {imgUrl && (
                            <div className={styles.accordionImg} style={{ backgroundImage: `url(${imgUrl})` }} />
                          )}
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
              /* ── DESKTOP: original layout ───────────────────────── */
              <div className={styles.contentArea}>
                <WavyEmblem />

                {/* Vertical Tabs Column */}
                <div className={styles.tabsCol}>
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

                {/* Content Column */}
                <div className={styles.contentCol}>
                  {currentTab && (
                    <>
                      <div className={styles.imageWrap}>
                        <div
                          className={`${styles.image} ${animating ? styles.imageOut : styles.imageIn}`}
                          style={{ backgroundImage: `url(${buildImageUrl(currentTab.imageEn)})` }}
                        />
                        <div className={styles.imageLabel}>{currentTab.headingEn}</div>
                      </div>
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
