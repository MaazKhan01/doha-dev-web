"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import { useLanguage } from "@/context/LanguageProvider";
import { languageSelector, imageSelector } from "@/utils/functions";
import { IMAGE_GALLERY_DETAIL_QUERY } from "@/utils/graphQueries";
import { buildWpUrl } from "@/utils/buildWpUrl";
import LogoLoader from "@/components/ui/LogoLoader";
import styles from "./ImageGalleryDetail.module.css";

export default function ImageGalleryDetail({ slug: slugProp }) {
  const routeParams = useParams();
  const slug = slugProp || routeParams?.slug || "";
  const lang = routeParams?.lang || "en";
  const { lng } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading } = useQuery(gql`${IMAGE_GALLERY_DETAIL_QUERY}`, {
    variables: { slug },
    skip: !slug,
  });

  const content = data?.imageGallery?.imageGalleryContent;
  const bannerSection = content?.bannerSection;
  const images = content?.imageGallery?.nodes || [];

  const bannerTitle =
    languageSelector(lng, bannerSection?.bannerTitleEn, bannerSection?.bannerTitleAr) ||
    content?.heading ||
    data?.imageGallery?.title ||
    "";

  const bannerImage = buildWpUrl(
    imageSelector(
      lng,
      bannerSection?.bannerBackgroundImageEn?.node?.mediaItemUrl,
      bannerSection?.bannerBackgroundImageAr?.node?.mediaItemUrl
    )
  );
  // heading
  const heading = languageSelector(lng, bannerSection?.bannerTitleEn, bannerSection?.bannerTitleAr);
  // count of images
  const totalImages = images.length;
  const goTo = useCallback((idx) => {
    if (images.length === 0) return;
    setActiveIndex((idx + images.length) % images.length);
  }, [images.length]);

  const handleKey = useCallback((e) => {
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  }, [goTo, activeIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title={bannerTitle}
        image={bannerImage}

      />

      <div className="innerPage-emblem py-20">
                        <div className="container">
                  <div className="my-8">
                    <h2 className="text-[40px] mb-4 font-medium text-theme-primary">{heading}</h2>
                    <h3> <span className="text-theme-red">{totalImages} </span> Photos</h3>
                  </div>
                </div>
        <main className={styles.mainContent}>


          {loading && images.length === 0 ? (
            <LogoLoader />
          ) : (
            <>
              {/* ── Peek Slider ── */}
              <div className={styles.sliderWrap}>

                <div className={styles.sliderTrack}>
                  {images.map((img, i) => {
                    const offset = i - activeIndex;
                    const rawSrc = img.sourceUrl || img.mediaItemUrl;
                    const src = rawSrc ? buildWpUrl(rawSrc) : null;
                    // Only render active and its immediate neighbours
                    if (Math.abs(offset) > 1) return null;
                    return (
                      <div
                        key={i}
                        className={styles.slide}
                        style={{
                          transform: `translateX(${offset * 100}%)`,
                          opacity: offset === 0 ? 1 : 0.45,
                          zIndex: offset === 0 ? 2 : 1,
                        }}
                        onClick={() => offset !== 0 && goTo(i)}
                        role={offset !== 0 ? "button" : undefined}
                        aria-label={offset !== 0 ? `View image ${i + 1}` : undefined}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={img.altText || img.title || `Photo ${i + 1}`}
                          className={styles.slideImg}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Prev arrow */}
                {images.length > 1 && (
                  <button
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {/* Next arrow */}
                {images.length > 1 && (
                  <button
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                )}

                {/* Counter */}
                {images.length > 0 && (
                  <span className={styles.counter}>
                    {activeIndex + 1} / {images.length}
                  </span>
                )}
              </div>

              {/* Dot navigation */}
              {images.length > 1 && (
                <div className={styles.dots}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                      onClick={() => goTo(i)}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Caption */}
              {images[activeIndex]?.altText && (
                <p className={styles.caption}>{images[activeIndex].altText}</p>
              )}
            </>
          )}
          {/* Back button */}
          <div className="container">   <Link href={`/${lang}/image-gallery`} className={`${styles.backBtn} mt-12`}>
            <FaArrowLeft size={13} />
            Back to Gallery
          </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
