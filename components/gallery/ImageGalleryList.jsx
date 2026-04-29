"use client";
import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FaImages } from "react-icons/fa";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import { useLanguage } from "@/context/LanguageProvider";
import { languageSelector, imageSelector } from "@/utils/functions";
import { IMAGE_GALLERY_LIST_QUERY } from "@/utils/graphQueries";
import { buildWpUrl } from "@/utils/buildWpUrl";
import LogoLoader from "@/components/ui/LogoLoader";
import styles from "./ImageGalleryList.module.css";
import moment from "moment";

function slugFromUri(uri) {
  return uri?.replace(/\/$/, "").split("/").pop() || "";
}

export default function ImageGalleryList() {
  const params = useParams();
  const lang = params?.lang || "en";
  const { lng } = useLanguage();

  const { data, loading } = useQuery(gql`${IMAGE_GALLERY_LIST_QUERY}`);

  const bannerSection = data?.page?.flexibleContent?.bannerSection;
  const components = data?.page?.flexibleContent?.component || [];
  const mediaGrid = components.find((c) => c?.fieldGroupName?.includes("MediaGridLayout"));
  const albums = mediaGrid?.imageDetails?.nodes || [];

  const bannerTitle =
    languageSelector(lng, bannerSection?.bannerTitleEn, bannerSection?.bannerTitleAr) ||
    "Image Gallery";
  const bannerImage = buildWpUrl(
    imageSelector(
      lng,
      bannerSection?.bannerBackgroundImageEn?.node?.mediaItemUrl,
      bannerSection?.bannerBackgroundImageAr?.node?.mediaItemUrl
    )
  );

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title={bannerTitle}
        image={bannerImage}
      />

      <div className="innerPage-emblem py-12">
        <main className={styles.mainContent}>
          {loading && albums.length === 0 ? (
            <LogoLoader />
          ) : (
            <div className={styles.grid}>
              {albums.map((album) => {
                const content = album?.imageGalleryContent;
                if (!content) return null;

                const slug = slugFromUri(album.uri);
                const title =
                  languageSelector(lng, content.bannerSection?.bannerTitleEn, content.bannerSection?.bannerTitleAr) ||
                  content.heading || "";
                const rawThumb =
                  content.imageGallery?.nodes?.[0]?.sourceUrl ||
                  content.imageGallery?.nodes?.[0]?.mediaItemUrl;
                const thumb = rawThumb ? buildWpUrl(rawThumb) : null;
                const count = content.photoCount;
                const date = content.imageGallery?.nodes?.[0]?.date;
                return (
                  <Link
                    key={album.id || slug}
                    href={`/${lang}/image-gallery/${slug}`}
                    className={styles.card}
                  >
                    <div className={styles.cardImgWrap}>
                      <div
                        className={styles.cardImg}
                        style={{ backgroundImage: thumb ? `url(${thumb})` : "none" }}
                      />
                      {count && (
                        <span className={styles.photoCount}>
                          <div className="text-xl text-[#b3331d]">{count.split(" ")[0]}</div>
                          <div className="text-xs">{lng === "ar" ? "صور" : "Photos"}</div>
                        </span>
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      {date && (
                        <span className={styles.cardDate}>
                           {lng === "ar" ? "نشر في" : "Posted on"}  {moment(date).format("DD MM YYYY")}
                        </span>
                      )}
                      <h3 className={styles.cardTitle}>{title}</h3>
                      
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
