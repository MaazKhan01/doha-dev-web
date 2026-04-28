"use client";
import { use } from "react";
import ImageGalleryDetail from "@/components/gallery/ImageGalleryDetail";

export default function ImageGalleryDetailRoute({ params }) {
  const { slug } = use(params);
  return <ImageGalleryDetail slug={slug} />;
}
