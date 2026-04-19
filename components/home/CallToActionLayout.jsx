"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { CALL_TO_ACTION_QUERY } from "@/utils/graphQueries";

export default function CallToActionLayout({ pageNo, idx }) {
  const { data: queryData, loading } = useQuery(gql`${CALL_TO_ACTION_QUERY}`, {
    variables: { id: pageNo.toString() },
    skip: !pageNo
  });

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  if (loading && !cmsData) return null;
  if (!cmsData) return null;

  return (
    <section style={{ padding: "4rem 0", background: "#f8f9fa", textAlign: "center" }}>
      <div className="container">
        <h2 className="header-title" style={{ color: "#4A102A" }}>{cmsData.titleEn}</h2>
        <p style={{ margin: "1.5rem 0", color: "#666", fontSize: "1.1rem" }}>{cmsData.descriptionEn}</p>
        {cmsData.linkUrlEn && (
          <Link 
            href={cmsData.linkUrlEn}
            style={{ 
              display: "inline-block", 
              padding: "1rem 2.5rem", 
              background: "#4A102A", 
              color: "#fff", 
              borderRadius: "50px",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            {cmsData.linkTextEn || "Learn More"}
          </Link>
        )}
      </div>
    </section>
  );
}
