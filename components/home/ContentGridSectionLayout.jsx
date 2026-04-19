"use client";
import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { CONTENT_GRID_QUERY } from "@/utils/graphQueries";

export default function ContentGridSectionLayout({ pageNo, idx }) {
  const { data: queryData, loading } = useQuery(
    gql`
      ${CONTENT_GRID_QUERY}
    `,
    {
      variables: { id: pageNo.toString() },
      skip: !pageNo,
    }
  );

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  const blocks = useMemo(() => cmsData?.theBlock || [], [cmsData]);

  if (loading && !cmsData) return null;
  if (!cmsData && !loading) return null;

  return (
    <section style={{ padding: "4rem 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {blocks.map((block, i) => {
            const imgPath = block.imageEn?.node?.mediaItemUrl;
            const absoluteImg = (imgPath && !imgPath.startsWith('http'))
              ? `${process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, '')}${imgPath}`
              : imgPath;

            return (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                {absoluteImg && (
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img 
                      src={absoluteImg} 
                      alt={block.headingEn} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", color: "#4A102A", marginBottom: "0.75rem" }}>{block.headingEn}</h3>
                {block.buttonEn && block.buttonEn.title && (
                   <a 
                    href={block.buttonEn.link || "#"} 
                    style={{ 
                      display: "inline-block", 
                      marginTop: "1rem", 
                      padding: "0.5rem 1rem", 
                      background: block.buttonEn.backgroundColor || "#4A102A", 
                      color: block.buttonEn.textColor || "#fff", 
                      borderRadius: "6px", 
                      textDecoration: "none" 
                    }}
                  >
                    {block.buttonEn.title}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
}
