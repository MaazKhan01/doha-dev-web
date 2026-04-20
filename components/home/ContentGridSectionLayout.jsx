"use client";
import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { CONTENT_GRID_QUERY } from "@/utils/graphQueries";
import Slider from "react-slick";
import styles from "./ContentGridSectionLayout.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RightOffcanvas from "@/components/ui/RightOffcanvas";

const slickSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

// ✅ callPopout comes as ["Yes"] | [] | null from CMS
const isCallPopout = (value) =>
  Array.isArray(value) ? value.includes("Yes") : Boolean(value);

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

  const [selected, setSelected] = useState(null);

  const blocks = useMemo(() => {
    if (!cmsData?.pressReleaseSelection?.nodes) return [];
    return cmsData.pressReleaseSelection.nodes
      .filter((node) => node?.pressReleaseContent)
      .map((node) => ({
        ...node.pressReleaseContent,
        _meta: {
          id: node.id,
          uri: node.uri,
          title: node.title,
          slug: node.slug,
          pressReleaseId: node.pressReleaseId,
        },
      }));
  }, [cmsData]);

  if (loading && !cmsData) return null;
  if (!cmsData && !loading) return null;

  // ✅ Both mediaItemUrl and filePath are returning relative paths from this CMS
  // so we always prepend WP_URL for relative paths
  const resolveImg = (imageNode) => {
    if (!imageNode) return null;
    const path = imageNode.mediaItemUrl || imageNode.filePath;
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `${process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, "")}${path}`;
  };

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.headerTitle + " header-title"}>
              {cmsData.sectionHeadingEn}
            </h2>
            <p
              className={styles.headerDescription}
              dangerouslySetInnerHTML={{ __html: cmsData.sectionDescriptionEn }}
            />
          </div>

          <div className={styles.sliderWrap}>
            <Slider {...slickSettings}>
              {blocks.map((block, i) => {
                const cardImg = resolveImg(block.imageEn?.node);
                // ✅ callPopout is ["Yes"] | [] | null
                const showPopout = isCallPopout(block.callPopout);

                return (
                  <div key={block._meta.id || i} className={styles.slide}>
                    <div className={styles.card}>
                      {cardImg && (
                        <div className={styles.cardImg}>
                          <div
                            className={styles.cardImgBg}
                            style={{ backgroundImage: `url(${cardImg})` }}
                          />
                        </div>
                      )}
                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{block.headingEn}</h3>

                        {!showPopout && block.buttonEn?.title && (
                          <a
                            href={block.buttonEn.link || "#"}
                            className={styles.button}
                            style={{
                              background: block.buttonEn.backgroundColor,
                              color: block.buttonEn.textColor,
                            }}
                          >
                            {block.buttonEn.title}
                          </a>
                        )}
                        {showPopout && (
                          <button
                            className={styles.viewMoreBtn}
                            onClick={() => setSelected(block)}
                            aria-label={`Read more: ${block.headingEn}`}
                          >
                            Read more
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>

      {selected && (
        <RightOffcanvas
          open={!!selected}
          onClose={() => setSelected(null)}
          image={resolveImg(
            selected.popoutContent?.image?.node || selected.imageEn?.node
          )}
          heading={selected.popoutContent?.headingEn || selected.headingEn}
        >
          {selected.popoutContent?.contentEn && (
            <div
              dangerouslySetInnerHTML={{
                __html: selected.popoutContent.contentEn,
              }}
            />
          )}
        </RightOffcanvas>
      )}
    </>
  );
}