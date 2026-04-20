"use client";
import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { CONTENT_GRID_QUERY } from "@/utils/graphQueries";
import Slider from "react-slick";
import styles from "./ContentGridSectionLayout.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slickSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

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
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sliderWrap}>
          <Slider {...slickSettings}>
            {blocks.map((block, i) => {
              const imgPath = block.imageEn?.node?.mediaItemUrl;
              const absoluteImg = (imgPath && !imgPath.startsWith('http'))
                ? `${process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, '')}${imgPath}`
                : imgPath;

              return (
                <div key={i} className={styles.slide}>
                  <div className={styles.card}>
                    {absoluteImg && (
                      <div className={styles.cardImg}>
                        <img 
                          src={absoluteImg} 
                          alt={block.headingEn} 
                        />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{block.headingEn}</h3>
                      {block.buttonEn && block.buttonEn.title && (
                         <a 
                          href={block.buttonEn.link || "#"} 
                          className={styles.button}
                          style={{ 
                            background: block.buttonEn.backgroundColor, 
                            color: block.buttonEn.textColor 
                          }}
                        >
                          {block.buttonEn.title}
                        </a>
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
  );
}
