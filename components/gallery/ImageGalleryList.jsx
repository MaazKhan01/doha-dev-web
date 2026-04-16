"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import styles from "./ImageGalleryList.module.css";

const GALLERY_ALBUMS = [
  {
    slug: "OCA-Evaluation-day2",
    title: "OCA Evaluation Committee visit - Day 2",
    date: "12 Nov 2020",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80",
    category: "Visit"
  },
  {
    slug: "OCA-Evaluation-day1",
    title: "OCA Evaluation Committee visit - Day 1",
    date: "11 Nov 2020",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
    category: "Visit"
  },
  {
    slug: "Youth-Working-Group",
    title: "Doha 2030 launch of Youth Working Group",
    date: "10 Dec 2023",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=900&q=80",
    category: "Launch"
  },
  {
    slug: "Green-Games-pledge",
    title: "Sustainability with Green Games pledge",
    date: "05 Nov 2023",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
    category: "Environment"
  },
  {
    slug: "Asian-Games-Bid",
    title: "Bolstered by World-Class Partners",
    date: "02 Feb 2024",
    image: "https://images.unsplash.com/photo-1585858229735-cd08d8cb510d?w=900&q=80",
    category: "Partnership"
  }
];

export default function ImageGalleryList() {
  const params = useParams();
  const lang = params?.lang || "en";

  return (
    <div className={styles.pageWrapper}>
      <InnerPageBanner
        title="Image Gallery"
        eyebrow="Media"
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Image Gallery" },
        ]}
      />

      <main className={styles.mainContent}>
        <div className={styles.grid}>
          {GALLERY_ALBUMS.map((album) => (
            <Link
              key={album.slug}
              href={`/${lang}/image-gallery/${album.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImgWrap}>
                <div
                  className={styles.cardImg}
                  style={{ backgroundImage: `url(${album.image})` }}
                />
                <span className={styles.categoryTag}>{album.category}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{album.title}</h3>
                <span className={styles.cardDate}>{album.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
