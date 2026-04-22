"use client";
import { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { CONTENT_SECTION_QUERY } from "@/utils/graphQueries";
import styles from "./AboutDoha2030Section.module.css";
import RightOffcanvas from "@/components/ui/RightOffcanvas";

export default function AboutDoha2030Section({ pageNo, idx }) {
  const [open, setOpen] = useState(false);

  const { data: queryData, loading } = useQuery(
    gql`
      ${CONTENT_SECTION_QUERY}
    `,
    {
      variables: { id: pageNo.toString() },
      skip: !pageNo,
    }
  );

  const cmsData = useMemo(() => {
    return queryData?.page?.flexibleContent?.component?.[idx] || null;
  }, [queryData, idx]);
  console.log(cmsData);
  const sectionData = useMemo(() => {
    if (cmsData) {
      const imgPath = cmsData.backgroundImageEn?.node?.sourceUrl;
      const absoluteImg = (imgPath && !imgPath.startsWith('http'))
        ? `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${imgPath}`
        : imgPath;

      return {
        tag: cmsData.headingEn || "About Doha 2030",
        heading: cmsData.subheadingEn || "Our Home, Your Gateway",
        image: absoluteImg || "https://agdoha2030.qa/themes/doha2030/images/MIA_Museum-011.jpg",
        description: cmsData.theContentEn || "",
        linkText: cmsData.buttonEn?.title || "Find out more",
        linkUrl: cmsData.buttonEn?.link || "#",
        popoutHeading: cmsData.popoutContent?.headingEn || cmsData.headingEn || "Our Home, Your Gateway",
        popoutDescription: cmsData.popoutContent?.contentEn || cmsData.theContentEn || "",
      };
    }
    return {
      tag: "About Doha 2030",
      heading: "Our Home, Your Gateway",
      image: "https://agdoha2030.qa/themes/doha2030/images/MIA_Museum-011.jpg",
      description: "A Doha 2030 Asian Games will provide a gateway to a brighter future for the Olympic Council of Asia (OCA), Asian National Olympic Committees (NOCs), the Asian Sports Federations and Qatar. The Games will deliver a lasting, sustainable Asian Olympic legacy through a celebration of sport for life, peaceful diversity, excellence and certainty.",
      linkText: "Find out more",
      linkUrl: "#",
      popoutHeading: "Our Home, Your Gateway",
      popoutDescription: "A Doha 2030 Asian Games will provide a gateway to a brighter future for the Olympic Council of Asia (OCA), Asian National Olympic Committees (NOCs), the Asian Sports Federations and Qatar. The Games will deliver a lasting, sustainable Asian Olympic legacy through a celebration of sport for life, peaceful diversity, excellence and certainty."
    };
  }, [cmsData]);

  if (loading && !cmsData) return null;

  return (
    <>
      <section id="doha2030" className={styles.section}>
        <div className={`${styles.header} container mx-auto mt-10`}>
          <h2 className="header-title">{sectionData.tag}</h2>
        </div>

        <div className={styles.body}>
          <div className="container mx-auto h-full flex items-center">
            <div
              className={styles.bgImage}
              style={{
                backgroundImage: `url(${sectionData.image})`,
              }}
            />

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                {sectionData.heading}
              </h3>
              <div
                className={styles.panelText}
                dangerouslySetInnerHTML={{ __html: sectionData.description }}
              />
              <button className={styles.cta} onClick={() => setOpen(true)}>
                {sectionData.linkText}
              </button>
            </div>
          </div>
        </div>
      </section>

      <RightOffcanvas
        open={open}
        onClose={() => setOpen(false)}
        image={sectionData.image}
        tag={sectionData.tag}
        heading={sectionData.popoutHeading}
      >
        <div dangerouslySetInnerHTML={{ __html: sectionData.popoutDescription }} />
      </RightOffcanvas>
    </>
  );
}
