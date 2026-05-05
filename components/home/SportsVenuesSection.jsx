"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./SportsVenuesSection.module.css";
import { gql, useQuery } from "@apollo/client";
import { CONTENT_SECTION_2_QUERY } from "@/utils/graphQueries";

// You can keep this as fallback or fetch venues dynamically later
const fallbackVenues = [
  {
    id: "venue-1",
    label: "Lusail Iconic Stadium",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    wide: true,
  },
  {
    id: "venue-2",
    label: "Al Bayt Stadium",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80",
  },
  // ... add more if needed
];

export default function SportsVenuesSection({ pageNo, idx }) {
  const params = useParams();
  const lang = (params?.lang) || "en";

  const { loading, data, error } = useQuery(gql`
    ${CONTENT_SECTION_2_QUERY}
  `, {
    variables: { id: pageNo?.toString() },
    skip: !pageNo,
  });

  const component = data?.page?.flexibleContent?.component?.[idx];

  // Dynamic content based on language
  const heading = lang === "ar" ? component?.headingAr : component?.headingEn;
  const content = lang === "ar" ? component?.theContentAr : component?.theContentEn;

  const backgroundImage = component?.backgroundImageEn?.node?.mediaItemUrl
    ? process.env.NEXT_PUBLIC_WP_URL + component.backgroundImageEn.node.mediaItemUrl
    : "";
  const backgroundImage2 = component?.backgroundImage2?.node?.mediaItemUrl
    ? process.env.NEXT_PUBLIC_WP_URL + component.backgroundImage2.node.mediaItemUrl
    : "";
  const mainImage = component?.imageEn?.node?.mediaItemUrl
    ? process.env.NEXT_PUBLIC_WP_URL + component.imageEn.node.mediaItemUrl
    : "/en/images/img-venue.png";

  const button = component?.buttonEn;

  // You can make venues dynamic later by adding a field in WordPress
  const venues = fallbackVenues; // Replace with dynamic data when available

  if (loading) return <section className={styles.section}>
    
  </section>;
  if (error) console.error("Error loading SportsVenuesSection:", error);

  return (
    <section id="sports-venues" className={`${styles.section} `}>
      {/* top image */}
        <div
          style={{ backgroundImage: `url('/en/images/top-emblem.png')` }}
          className={styles.bgTop}
        />
      {backgroundImage && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className={styles.bgLeft}
        ></div>
      )}

      <div className="flex items-center !flex-wrap container">
        {/* Left Content */}
        <div className={`${styles.content} lg:w-1/2 w-full`}>
          <h2 className="header-title">{heading || "Sports and Venues"}</h2>

          <p className={styles.subtitle}>
            {
              content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : "Doha&apos;s competition and non-competition venues are centrally located on a compact Games footprint. Venues have been selected taking into account the technical requirements of their respective International Federation (IF) sports..."
            }
          </p>

          {button && (
            <div className="">
              <Link href={button.link || `/${lang}/venues`}>
                <button
                  className={styles.btn}
                  style={{
                    color: button.textColor || "#000",
                    backgroundColor: button.backgroundColor || "#fff",
                  }}
                >
                  {button.title || "Find out more"}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={mainImage}
            alt={heading || "Sports Venues"}
            className="w-full h-auto lg:p-8"
          />
        </div>
      </div>

    </section>
  );
}