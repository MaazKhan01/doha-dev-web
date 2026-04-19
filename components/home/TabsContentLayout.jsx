"use client";
import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { TABS_CONTENT_QUERY } from "@/utils/graphQueries";

export default function TabsContentLayout({ pageNo, idx }) {
  const [activeTab, setActiveTab] = useState(0);

  const { data: queryData, loading } = useQuery(gql`${TABS_CONTENT_QUERY}`, {
    variables: { id: pageNo.toString() },
    skip: !pageNo
  });

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);

  const tabs = useMemo(() => cmsData?.tabs || [], [cmsData]);
  const title = useMemo(() => cmsData?.titleEn, [cmsData]);

  if (loading && !cmsData) return null;
  if (tabs.length === 0) return null;

  return (
    <section style={{ padding: "4rem 0", background: "#fdfdfd" }}>
      <div className="container">
        {title && <h2 className="header-title" style={{ marginBottom: "2rem" }}>{title}</h2>}
        
        <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: "2rem", overflowX: "auto" }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "1rem 2rem",
                border: "none",
                background: "none",
                borderBottom: activeTab === i ? "3px solid #4A102A" : "3px solid transparent",
                color: activeTab === i ? "#4A102A" : "#999",
                fontWeight: "600",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {tab.labelEn}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div style={{ lineHeight: "1.8", color: "#444" }}>
            <div dangerouslySetInnerHTML={{ __html: tabs[activeTab].contentEn }} />
          </div>
          {tabs[activeTab].imageEn?.node?.sourceUrl && (
            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img 
                src={tabs[activeTab].imageEn.node.sourceUrl} 
                alt={tabs[activeTab].labelEn} 
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
