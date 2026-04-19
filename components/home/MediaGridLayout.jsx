"use client";
import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { MEDIA_GRID_QUERY } from "@/utils/graphQueries";
import styles from "@/components/home/GallerySection.module.css";

export default function MediaGridLayout({ pageNo, idx }) {
  const { data: queryData, loading } = useQuery(gql`${MEDIA_GRID_QUERY}`, {
    variables: { id: pageNo.toString() },
    skip: !pageNo
  });

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  const images = useMemo(() => cmsData?.images || [], [cmsData]);
  const title = useMemo(() => cmsData?.titleEn || "Media Gallery", [cmsData]);

  if (loading && !cmsData) return null;

  return (
    <section className={styles.section} style={{ background: "#4A102A" }}>
      <div className="container">
        <h2 className="header-title" style={{ color: "#fff", marginBottom: "2rem" }}>{title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
          {images.map((img, i) => (
            <div key={i} style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: "8px" }}>
              <img 
                src={img.imageEn?.node?.sourceUrl} 
                alt={`Media ${i}`} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
