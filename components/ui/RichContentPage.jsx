"use client";
import { gql, useQuery } from "@apollo/client";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import { useLanguage } from "@/context/LanguageProvider";
import { languageSelector, imageSelector } from "@/utils/functions";
import { RICH_CONTENT_PAGE_QUERY } from "@/utils/graphQueries";
import { buildWpUrl } from "@/utils/buildWpUrl";

export default function RichContentPage({ uri, fallbackTitle = "" }) {
  const { lng } = useLanguage();

  const { data, loading } = useQuery(gql`${RICH_CONTENT_PAGE_QUERY}`, {
    variables: { uri },
  });

  const bannerSection = data?.page?.flexibleContent?.bannerSection;
  const components = data?.page?.flexibleContent?.component || [];
  const editorBlock = components.find(
    (c) => c?.fieldGroupName?.includes("ClassicEditorLayout")
  );
  const richContent = editorBlock?.richContent || "";

  const bannerTitle =
    languageSelector(lng, bannerSection?.bannerTitleEn, bannerSection?.bannerTitleAr) ||
    fallbackTitle;

  const bannerImage = buildWpUrl(
    imageSelector(
      lng,
      bannerSection?.bannerBackgroundImageEn?.node?.mediaItemUrl,
      bannerSection?.bannerBackgroundImageAr?.node?.mediaItemUrl
    )
  );

  const overlayColor =
    !bannerSection?.bannerBackgroundImageEn?.node
      ? languageSelector(lng, bannerSection?.bannerBackgroundColorEn, bannerSection?.bannerBackgroundColorAr) || undefined
      : undefined;

  return (
    <>
      <InnerPageBanner
        title={bannerTitle}
        image={bannerImage}
        overlayColor={overlayColor}

      />
      <div className=" innerPage-emblem">
        <main className="container py-12">
          {loading && !richContent ? (
            <div style={{ color: "#888", textAlign: "center", padding: "4rem 0" }}>Loading…</div>
          ) : (
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: richContent }}
              style={{
                lineHeight: 1.8,
                color: "#333",
                fontSize: "1rem",
              }}
            />
          )}
        </main>
      </div>
    </>
  );
}
