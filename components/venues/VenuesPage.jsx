"use client";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import { useLanguage } from "@/context/LanguageProvider";
import { languageSelector, imageSelector } from "@/utils/functions";
import { VENUES_QUERY } from "@/utils/graphQueries";
import styles from "./VenuesPage.module.css";
import { buildWpUrl } from "@/utils/buildWpUrl";
import { FaSearch, FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";
import LogoLoader from "@/components/ui/LogoLoader";


export default function VenuesPage() {
  const { lng } = useLanguage();
  const isAr = lng === "ar";

  const [activeTabId, setActiveTabId] = useState(null);
  const [expandedTabIds, setExpandedTabIds] = useState(new Set());
  const [fading, setFading] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [popupImage, setPopupImage] = useState(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openImagePopup = (url) => {
    setPopupImage(url);
  };

  const closePopup = () => {
    setPopupImage(null);
  };


  const { data, loading } = useQuery(gql`${VENUES_QUERY}`);

  const bannerSection = data?.page?.flexibleContent?.bannerSection;

  const tabsComponent = data?.page?.flexibleContent?.component?.find(
    (c) => c?.fieldGroupName?.includes("TabsContentLayout")
  );
  const allNodes = tabsComponent?.addTab?.nodes || [];
  const mainTabs = allNodes.filter((node) => !node?.tabFields?.isSubtab);

  // Initialise selection when data arrives
  useEffect(() => {
    if (mainTabs.length > 0 && !activeTabId) {
      const first = mainTabs[0];
      const firstSubs = getValidSubs(first);
      if (firstSubs.length > 0) {
        setExpandedTabIds(new Set([first.id]));
        setActiveTabId(firstSubs[0].id);
      } else {
        setActiveTabId(first.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNodes.length]);

  // Resolve active content node (main tab or subtab)
  const activeContent = (() => {
    for (const tab of mainTabs) {
      if (tab.id === activeTabId) return tab;
      const found = getValidSubs(tab).find((s) => s.id === activeTabId);
      if (found) return found;
    }
    return mainTabs[0] || null;
  })();

  const changeTab = (id) => {
    if (id === activeTabId) return;
    setFading(true);
    setTimeout(() => {
      setActiveTabId(id);
      setSliderIndex(0);
      setOpenAccordionIndex(null);
      setFading(false);
    }, 260);
  };

  const handleMainTabClick = (tab) => {
    const subs = getValidSubs(tab);
    if (subs.length > 0) {
      setExpandedTabIds((prev) => {
        const next = new Set(prev);
        if (next.has(tab.id)) {
          next.delete(tab.id);
        } else {
          next.add(tab.id);
        }
        return next;
      });
      if (!expandedTabIds.has(tab.id)) {
        changeTab(subs[0].id);
      }
    } else {
      changeTab(tab.id);
    }
  };

  const fields = activeContent?.tabFields;
  const title = fields
    ? languageSelector(lng, fields.titleEn, fields.titleAr) || activeContent?.title
    : "";
  const contentHtml = fields
    ? languageSelector(lng, fields.contentEn, fields.contentAr) || ""
    : "";
  const galleries = fields?.imageGalleryEn?.nodes || [];
  const extraImages = galleries;
  const document = fields?.documentEn?.node;
  const showDistance = fields?.showDistanceInformation;
  const distanceInfo = fields?.distanceInformationSection;
  const accordion = fields?.accordion;


  const imageUrl = buildWpUrl(
    distanceInfo?.mapImageEn?.node?.mediaItemUrl
  );

  // Mobile: find which main-tab is currently "active" (has the active content)
  const activeMainTabNode = mainTabs.find(
    (t) => t.id === activeTabId || getValidSubs(t).some((s) => s.id === activeTabId)
  );
  const activeSubs = activeMainTabNode ? getValidSubs(activeMainTabNode) : [];
  return (
    <div className=" relative">
      <InnerPageBanner
        title={
          languageSelector(
            lng,
            bannerSection?.bannerTitleEn,
            bannerSection?.bannerTitleAr
          ) || "Sports & Venues"
        }
        image={buildWpUrl(
          imageSelector(
            lng,
            bannerSection?.bannerBackgroundImageEn?.node?.mediaItemUrl,
            bannerSection?.bannerBackgroundImageAr?.node?.mediaItemUrl
          )
        )}
        overlayColor={!bannerSection?.bannerBackgroundImageEn?.node ? bannerSection?.bannerBackgroundColorEn : undefined}

      />
      <div className="innerPage-emblem relative">
        <main className={styles.mainContent}>
          {loading && mainTabs.length === 0 ? (
            <LogoLoader />
          ) : (
            <div className={styles.contentLayout}>

              {/* ── MOBILE: two stacked scrollable rows ─── */}
              {isMobile ? (
                <div className={styles.mobileNavWrap} dir={isAr ? "rtl" : "ltr"}>
                  {/* Row 1 — main tabs */}
                  <div className={styles.mobileMainRow}>
                    {mainTabs.map((tab) => {
                      const tabLabel = languageSelector(lng, tab.tabFields?.titleEn, tab.tabFields?.titleAr) || tab.title;
                      const isActive = activeMainTabNode?.id === tab.id;
                      return (
                        <button
                          key={tab.id}
                          className={`${styles.mobileMainBtn} ${isActive ? styles.mobileMainBtnActive : ""}`}
                          onClick={() => handleMainTabClick(tab)}
                        >
                          {tabLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row 2 — sub-tabs of the active main tab */}
                  {activeSubs.length > 0 && (
                    <div className={styles.mobileSubRow}>
                      {activeSubs.map((sub) => {
                        const subLabel = languageSelector(lng, sub.tabFields?.titleEn, sub.tabFields?.titleAr) || sub.title;
                        return (
                          <button
                            key={sub.id}
                            className={`${styles.mobileSubBtn} ${activeTabId === sub.id ? styles.mobileSubBtnActive : ""}`}
                            onClick={() => changeTab(sub.id)}
                          >
                            {subLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* ── DESKTOP: left vertical tabs ───────── */
                <aside
                  className={styles.tabsColumn}
                  aria-label="Venue categories"
                  style={isAr ? { order: 1 } : undefined}
                >
                  <div className={styles.tabsSectionTitle}>Navigation</div>

                  {mainTabs.map((tab) => {
                    const tabLabel = languageSelector(lng, tab.tabFields?.titleEn, tab.tabFields?.titleAr) || tab.title;
                    const subs = getValidSubs(tab);
                    const isExpanded = expandedTabIds.has(tab.id);
                    const isActive = activeTabId === tab.id;
                    const hasActiveSub = subs.some((s) => s.id === activeTabId);

                    return (
                      <div key={tab.id}>
                        <button
                          role="tab"
                          aria-selected={isActive || hasActiveSub}
                          className={`${styles.tabBtn} ${isActive || hasActiveSub ? styles.tabBtnActive : ""} flex justify-between items-center`}
                          onClick={() => handleMainTabClick(tab)}
                        >
                          <span>{tabLabel}</span>
                          {subs.length > 0 ? (
                            <span className={styles.plusMinusIcon}>
                              {isExpanded || hasActiveSub ? (
                                <FaMinus size={10} color="var(--red-primary)" />
                              ) : (
                                <FaPlus size={10} color="#999" />
                              )}
                            </span>
                          ) : (
                            <FaAngleRight size={18} color={isActive ? "var(--red-primary)" : "#dedede"} />
                          )}
                        </button>

                        <ul
                          className={`${styles.subTabList} ${isExpanded ? styles.subTabListOpen : ""}`}
                          role="tablist"
                        >
                          {subs.map((sub) => {
                            const subLabel = languageSelector(lng, sub.tabFields?.titleEn, sub.tabFields?.titleAr) || sub.title;
                            return (
                              <li key={sub.id}>
                                <button
                                  className={`${styles.subTabBtn} ${activeTabId === sub.id ? styles.subTabBtnActive : ""}`}
                                  onClick={() => changeTab(sub.id)}
                                >
                                  <span>{subLabel}</span>
                                  {activeTabId === sub.id && <span><FaAngleRight size={19} /></span>}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </aside>
              )}

              {/* ── Right content panel ──────────────── */}
              <section className={styles.contentPanel}>
                <div className={`${styles.contentInner} ${fading ? styles.contentFading : ""}`}>

                  {/* Hero image */}
                  {/* {heroImage && (
                  <div className={styles.contentImageWrap}>
                    <div
                      className={styles.contentImageBg}
                      style={{
                        backgroundImage: `url(${imageSelector(
                          lng,
                          heroImage.mediaItemUrl || heroImage.filePath || heroImage.file,
                          heroImage.mediaItemUrl || heroImage.filePath || heroImage.file
                        )})`,
                      }}
                    />
                    <div className={styles.contentImageOverlay} />
                    <span className={styles.contentImageLabel}>{title}</span>
                  </div>
                )} */}

                  {/* Body */}
                  <div className={styles.contentBody} dir={isAr ? "rtl" : "ltr"}>
                    {title && <h2 className={styles.contentTitle}>{title}</h2>}

                    {/* Distance information section */}
                    {showDistance && distanceInfo && (
                      <div style={{
                        marginTop: "2rem",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 6,
                        overflow: "hidden",
                      }}>
                        {/* Section header */}
                        {distanceInfo.sectionTitleEn && (
                          <div style={{
                            background: "#b3331d",
                            color: "#fff",
                            padding: "0.7rem 1.25rem",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}>
                            {distanceInfo.sectionTitleEn}
                          </div>
                        )}

                        {/* Map + items row */}
                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "stretch",
                          background: "#fafafa",
                        }}>


                          {/* Distance items */}
                          <div style={{ flex: 1, padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            {distanceInfo.distanceItems?.length > 0 && distanceInfo.distanceItems.map((item, i) => (
                              <div key={i} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.85rem",
                                paddingBottom: i < distanceInfo.distanceItems.length - 1 ? "0.85rem" : 0,
                                borderBottom: i < distanceInfo.distanceItems.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                              }}>
                                {/* Icon */}
                                {item.iconEn?.node?.mediaItemUrl && (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={buildWpUrl(item.iconEn.node.mediaItemUrl)}
                                    alt=""
                                    style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }}
                                  />
                                )}

                                {/* Label + distance + time */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  {item.venueNameEn && (
                                    <div style={{ fontSize: "15px", color: "#222222", marginBottom: "0.2rem" }}>
                                      {item.venueNameEn}
                                    </div>
                                  )}
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                                    {item.distanceEn && (
                                      <span style={{
                                        fontSize: "18px",
                                        color: "#b3331d",
                                        lineHeight: 1,
                                      }}>
                                        {item.distanceEn.trim()} |
                                      </span>
                                    )}
                                    {item.travelTimeEn && (
                                      <span style={{
                                        fontSize: "18px",
                                        color: "#b3331d",
                                        lineHeight: 1,
                                      }}>
                                        {item.travelTimeEn}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Map image */}

                          {distanceInfo.mapImageEn?.node?.mediaItemUrl && (
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              borderRight: "1px solid rgba(0,0,0,0.07)",
                            }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <div className="border-1 flex items-center justify-center flex-col">
                                {distanceInfo.mapLabelEn && (
                                  <div style={{
                                    padding: "0.45rem 0.75rem",
                                    fontSize: "18px",
                                    borderTop: "1px solid rgba(0,0,0,0.07)",
                                    textAlign: "center",
                                    color: "#b3331d"
                                  }}>
                                    {distanceInfo.mapLabelEn}
                                  </div>
                                )}
                                <img
                                  src={imageUrl}
                                  alt={distanceInfo.mapLabelEn || ""}
                                  style={{
                                    width: "100%",
                                    height: "100px",
                                    objectFit: "cover",
                                    display: "block",
                                    cursor: "pointer"
                                  }}
                                  onClick={() => openImagePopup(imageUrl)}
                                />
                              </div>

                              {/* Button */}
                              <div className="m-4">
                                <button
                                  style={{ fontSize: "15px", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px", flexDirection: "column", justifyContent: "center" }}
                                  onClick={() => openImagePopup(imageUrl)}
                                >
                                  <FaSearch color="#b3331d" size={20} />
                                  Click here Open <br /> to view large Map
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Accordion section */}
                    {accordion?.accordionItem?.length > 0 && (
                      <div style={{ marginTop: "2rem", backgroundColor: "#fff", padding: "1rem" }}>
                        {/* Main heading */}
                        {(accordion.headingEn || accordion.headingAr) && (
                          <h3 style={{
                            fontSize: "24px",
                            fontWeight: 500,
                            color: "#b3331d",
                            marginBottom: "0.75rem",
                          }}>
                            {languageSelector(lng, accordion.headingEn, accordion.headingAr)}
                          </h3>
                        )}

                        {/* Accordion items */}
                        <div style={{ overflow: "hidden" }}>
                          {accordion.accordionItem.map((item, i) => {
                            const isOpen = openAccordionIndex === i;
                            const itemTitle = languageSelector(lng, item.titleEn, item.titleAr);
                            return (
                              <div key={i}>
                                {/* Item header */}
                                <button
                                  onClick={() => setOpenAccordionIndex(isOpen ? null : i)}
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "3px 0",
                                    borderRadius: "0px",
                                    justifyContent: "space-between",
                                    padding: "0.85rem 1.1rem",
                                    background: isOpen ? "#7d7a25" : "#cec8be66",
                                    border: "none",
                                    color: isOpen ? "#fafafa !important" : "#222 !important",
                                    cursor: "pointer",
                                    textAlign: isAr ? "right" : "left",
                                    gap: "0.75rem",
                                    transition: "background 0.2s ease",
                                  }}
                                >
                                  <span style={{ fontSize: "15px", fontWeight: 700, flex: 1, color: isOpen ? "#fafafa" : "var(--red-primary)" }}>
                                    {itemTitle}
                                  </span>
                                  <span className={styles.plusMinusIcon}>
                                    {isOpen ? <FaMinus size={12} color={isOpen ? "#fafafa" : "var(--red-primary)"} /> :
                                      <FaPlus size={12} color={isOpen ? "#fafafa" : "var(--red-primary)"} />}
                                  </span>
                                </button>

                                {/* Expandable rows table */}
                                {isOpen && item.row?.length > 0 && (
                                  <div style={{ background: "#fff" }}>
                                    <h3 className="text-[#7d7a25]" style={{ padding: "10px 20px", fontWeight: "600" }}>
                                      {languageSelector(
                                        lng,
                                        item.row[0].labelEn,
                                        item.row[0].labelAr
                                      )}
                                    </h3>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                                      <tbody>
                                        {item.row.slice(1).map((r, j) => (
                                          <tr
                                            key={j}
                                            style={{
                                              borderTop: "1px solid rgba(0,0,0,0.06)",
                                              background: j % 2 === 0 ? "#fff" : "#fafafa"
                                            }}
                                          >
                                            <td style={{
                                              padding: "0.6rem 1.1rem",
                                              color: "#555",
                                              fontWeight: 600,
                                              width: "40%",
                                              verticalAlign: "top",
                                              borderRight: "1px solid rgba(0,0,0,0.06)",
                                              whiteSpace: "nowrap",
                                            }}>
                                              {languageSelector(lng, r.labelEn, r.labelAr)}
                                            </td>

                                            <td style={{
                                              padding: "0.6rem 1.1rem",
                                              color: "#222",
                                              verticalAlign: "top",
                                            }}>
                                              {languageSelector(lng, r.valueEn, r.valueAr)}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Document download */}
                    {document?.mediaItemUrl && (
                      // show doc in iframe
                      <iframe
                        src={buildWpUrl(document?.mediaItemUrl)}
                        style={{
                          width: "100%",
                          height: "500px",
                        }}
                      />


                    )}
                    {contentHtml && (
                      <div
                        className={styles.contentText}
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                      />
                    )}

                    {/* Extra gallery images – slider when more than one */}
                    {extraImages.length === 1 && (
                      <div style={{ marginTop: "1.5rem", borderRadius: 4, overflow: "hidden" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageSelector(
                            lng,
                            extraImages[0].mediaItemUrl || extraImages[0].filePath || extraImages[0].file,
                            extraImages[0].mediaItemUrl || extraImages[0].filePath || extraImages[0].file
                          )}
                          alt=""
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    )}

                    {extraImages.length > 1 && (
                      <div style={{ marginTop: "1.5rem", position: "relative", borderRadius: 4, overflow: "hidden", background: "#f0eeeb" }}>
                        {/* Slide */}
                        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            key={sliderIndex}
                            src={imageSelector(
                              lng,
                              extraImages[sliderIndex].mediaItemUrl || extraImages[sliderIndex].filePath || extraImages[sliderIndex].file,
                              extraImages[sliderIndex].mediaItemUrl || extraImages[sliderIndex].filePath || extraImages[sliderIndex].file
                            )}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              transition: "opacity 0.3s ease",
                            }}
                          />
                        </div>

                        {/* Prev arrow */}
                        <button
                          onClick={() => setSliderIndex((p) => (p - 1 + extraImages.length) % extraImages.length)}
                          aria-label="Previous image"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "0.75rem",
                            transform: "translateY(-50%)",
                            background: "#6596ad",
                            border: "none",
                            width: 50,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {/* Next arrow */}
                        <button
                          onClick={() => setSliderIndex((p) => (p + 1) % extraImages.length)}
                          aria-label="Next image"
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "0.75rem",
                            transform: "translateY(-50%)",
                            background: "#6596ad",
                            border: "none",
                            width: 50,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Dot indicators */}
                        <div style={{
                          position: "absolute",
                          bottom: "0.6rem",
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          gap: "0.4rem",
                        }}>
                          {extraImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setSliderIndex(i)}
                              aria-label={`Go to image ${i + 1}`}
                              style={{
                                width: i === sliderIndex ? 20 : 8,
                                height: 8,
                                borderRadius: 4,
                                border: "none",
                                background: i === sliderIndex ? "#b3331d" : "rgba(255,255,255,0.7)",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.25s ease, background 0.25s ease",
                              }}
                            />
                          ))}
                        </div>

                        {/* Counter */}
                        <span style={{
                          position: "absolute",
                          top: "0.6rem",
                          right: "0.75rem",
                          background: "rgba(0,0,0,0.45)",
                          color: "#fff",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.55rem",
                          borderRadius: 3,
                        }}>
                          {sliderIndex + 1} / {extraImages.length}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              </section>

            </div>
          )}
        </main>
      </div>
      {/* ── Map image popup ── */}
      {popupImage && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popupImage}
              alt="Map"
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: 6,
                display: "block",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
            />
            <button
              onClick={closePopup}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#b3331d",
                border: "2px solid #fff",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Returns subtab nodes that have actual TabContent data
function getValidSubs(tab) {
  return (tab?.tabFields?.subTab?.nodes || []).filter((s) => s?.tabFields);
}
