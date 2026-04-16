"use client";
import React from "react";
import ImageGalleryDetail from "@/components/gallery/ImageGalleryDetail";

export default function ImageGalleryDetailRoute({ params }) {
  // `params` is a promise in Next 15+, but since this is client component it might be available directly, or React.use(params)
  // Next 13-14 client components can access params.slug.
  const slug = params?.slug || "default";

  return <ImageGalleryDetail slug={slug} />;
}
