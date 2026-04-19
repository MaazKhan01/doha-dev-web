"use client";
import { useState, useMemo } from "react";
import styles from "./AboutQatarSection.module.css";
import { gql, useQuery } from "@apollo/client";
import { ABOUT_QATAR } from "@/utils/graphQueries";

/* Wavy circular background emblem */
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

export default function AboutQatarSection({ pageNo, idx }) {
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { loading, data } = useQuery(gql`
    ${ABOUT_QATAR}
  `, {
    variables: { id: pageNo.toString() },
    skip: !pageNo
  });

  const guides = useMemo(() => {
    return data?.page?.flexibleContent?.component?.[idx]?.guideRelation?.nodes || [];
  }, [data, idx]);

  const currentTabs = useMemo(() => {
    return guides[activeMainTab]?.guideContent?.steps || [];
  }, [guides, activeMainTab]);

  const currentTab = useMemo(() => {
    return currentTabs[activeSubTab] || null;
  }, [currentTabs, activeSubTab]);

  const handleMainTabChange = (idx) => {
    if (idx === activeMainTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveMainTab(idx);
      setActiveSubTab(0);
      setAnimating(false);
    }, 300);
  };

  const handleSubTabChange = (idx) => {
    if (idx === activeSubTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSubTab(idx);
      setAnimating(false);
    }, 300);
  };

  console.log("Guide Data:", guides);

  if (loading && guides.length === 0) return null;
  if (!loading && guides.length === 0) {
    console.warn("AboutQatarSection: No guide nodes found in guideRelation");
    return null;
  }

  return (
    <section id="about-qatar" className={styles.section}>
      <WavyEmblem />

      <div className={styles.innerWrapper}>
        <div className={`container mx-auto`}>
          <h2 className="header-title">About Doha</h2>
        </div>

        {/* Main Tabs Header */}
        <div className={`${styles.mainTabsHeader} container mx-auto`}>
          {guides.map((guide, idx) => (
            <button
              key={guide.id}
              className={`${styles.mainTabBtn} ${activeMainTab === idx ? styles.mainTabBtnActive : ""}`}
              onClick={() => handleMainTabChange(idx)}
            >
              {guide.title}
            </button>
          ))}
        </div>

        <div className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.contentArea}>
              {/* Vertical Tabs Column */}
              <div className={styles.tabsCol}>
                {currentTabs.map((t, i) => (
                  <button
                    key={i}
                    className={`${styles.tabBtn} ${i === activeSubTab ? styles.tabBtnActive : ""}`}
                    onClick={() => handleSubTabChange(i)}
                  >
                    {t.headingEn}
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
                        style={{ 
                          backgroundImage: `url(${
                            currentTab.imageEn?.node?.sourceUrl?.startsWith('http') 
                              ? currentTab.imageEn.node.sourceUrl 
                              : `${process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, '')}${currentTab.imageEn?.node?.sourceUrl || ''}`
                          })` 
                        }}
                      />
                      <div className={styles.imageLabel}>{currentTab.headingEn}</div>
                    </div>

                    <div className={`${styles.descBox} ${animating ? styles.descOut : styles.descIn}`}>
                      {currentTab.descEn}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
