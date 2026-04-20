"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./GallerySection.module.css";
import { FaPlay, FaImages, FaChevronRight } from "react-icons/fa";

const cards = [
  {
    id: "gallery-videos",
    icon: <FaPlay />,
    title: "Videos",
    desc: "Checkout the latest Video Gallery",
    hrefTarget: "video-gallery"
  },
  {
    id: "gallery-images",
    icon: <FaImages />,
    title: "Image Gallery",
    desc: "Checkout the latest Image Gallery",
    hrefTarget: "image-gallery"
  },
];

/* Islamic arabesque/geometric tileable pattern SVG */
function ArabesqueEmblem() {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.emblem}
    >
      <defs>
        <pattern id="arabesque" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* 8-pointed star */}
          <polygon
            points="40,5 48,22 65,15 58,32 75,40 58,48 65,65 48,58 40,75 32,58 15,65 22,48 5,40 22,32 15,15 32,22"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            opacity="0.7"
          />
          {/* Inner square */}
          <rect x="27" y="27" width="26" height="26" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" transform="rotate(45 40 40)" />
          {/* Center circle */}
          <circle cx="40" cy="40" r="4" fill="none" stroke="white" strokeWidth="0.8" opacity="0.7" />
          {/* Connecting lines */}
          <line x1="0" y1="0" x2="80" y2="0" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="0" y1="80" x2="80" y2="80" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="white" strokeWidth="0.3" opacity="0.3" />
          <line x1="80" y1="0" x2="80" y2="80" stroke="white" strokeWidth="0.3" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#arabesque)" />
    </svg>
  );
}

import { gql, useQuery } from "@apollo/client";
import { CALL_TO_ACTION_QUERY } from "@/utils/graphQueries";
import { useMemo } from "react";

export default function GallerySection({ pageNo, idx }) {
  const params = useParams();
  const lang = params?.lang || "en";

  const { data: queryData, loading } = useQuery(
    gql`
      ${CALL_TO_ACTION_QUERY}
    `,
    {
      variables: { id: pageNo.toString() },
      skip: !pageNo,
    }
  );

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  if (loading && !cmsData) return null;

  const title = cmsData?.headingEn || "Gallery";
  const desc = cmsData?.descriptionEn || "Checkout the latest gallery related to Doha 2030 AG Bid";
  const bgPath = cmsData?.backgroundImageEn?.node?.mediaItemUrl || cmsData?.backgroundImageEn?.node?.filePath;
  const absoluteBg = (bgPath && !bgPath.startsWith('http'))
    ? `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${bgPath}`
    : bgPath;
  const linkText = cmsData?.ctaLinkEn?.title || "Explore";
  const linkUrl = cmsData?.ctaLinkEn?.link || "#";

  return (
    <section id="gallery" className={styles.section}
      style={absoluteBg ? { backgroundImage: `url(${absoluteBg})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : {}}>

      <div className={styles.header + " container"}>
        <h2 className="header-title" style={{ color: "#fff" }}>{title}</h2>
        <p className={styles.subtitle}>
          {desc}
        </p>
      </div>

      <div className={styles.cards + " container"}>

        {cards.map((c) => (
          <Link href={`/${lang}/${c.hrefTarget}`} key={c.id} style={{ textDecoration: "none", flex: 1, display: "flex" }}>
            <div id={c.id} className={styles.card} style={{ width: "100%" }}>
              <div className={styles.cardIconCol}>
                <div className={styles.cardIconCircle}>{c.icon}</div>
              </div>
              <div className={styles.cardBody}>
                <div style={{ padding: "0px 20px" }}>
                  <h3 className={styles.cardTitle} style={{ fontSize: "24px" }}>{c.title}</h3>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </div>
                <FaChevronRight className={styles.cardArrow} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

