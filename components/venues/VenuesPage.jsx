"use client";
import { useState } from "react";
import InnerPageBanner from "@/components/ui/InnerPageBanner";
import styles from "./VenuesPage.module.css";

/* ── Tab / content data ────────────────────────────────── */
const TABS = [
  {
    id: "games-master-plan",
    label: "Games Master Plan",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1400&q=80",
    imageLabel: "Games Master Plan – Doha 2030",
    tag: "Overview",
    title: "A Compact, World-Class Games Footprint",
    body: [
      "Doha's competition and non-competition venues and facilities are strategically located on a compact Games footprint. A prerequisite, an essential element in delivering excellent operations, minimize risks, and enhance the overall Games experience.",
      "Modern, flexible, and adaptable venues and facilities located within the city network are the key success factors. Doha is ready.",
    ],
    stats: [
      { number: "35+", label: "Competition Venues" },
      { number: "12", label: "Sports Clusters" },
      { number: "< 30 min", label: "Between Venues" },
    ],
  },
  {
    id: "games-training-venues",
    label: "Games Training Venues",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80",
    imageLabel: "Training Venues – Doha 2030",
    tag: "Training",
    title: "World-Class Training Facilities",
    body: [
      "Qatar offers an extensive network of training venues, each fully equipped to international federation standards. Athletes will have access to facilities that match their competition venues in quality, ensuring peak performance preparation.",
      "Training venues are strategically located close to Athletes' Village and competition clusters to minimize travel time and maximize recovery.",
    ],
    stats: [
      { number: "40+", label: "Training Sites" },
      { number: "200+", label: "Sports Fields" },
      { number: "24/7", label: "Availability" },
    ],
  },
  {
    id: "games-athletes-village",
    label: "Games Athletes Village",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1400&q=80",
    imageLabel: "Athletes Village – Doha 2030",
    tag: "Accommodation",
    title: "A Home Away From Home",
    body: [
      "The Athletes' Village will serve as the primary accommodation hub for all athletes and team officials participating in the Doha 2030 Asian Games. Designed with comfort, community, and culture in mind, it will reflect the warmth of Qatari hospitality.",
      "The village will feature state-of-the-art dining, wellness, and recreational facilities — all within a secure, vibrant community environment.",
    ],
    stats: [
      { number: "15,000+", label: "Athlete Beds" },
      { number: "500+", label: "Staff Rooms" },
      { number: "30+", label: "Dining Venues" },
    ],
  },
  {
    id: "non-competition-venues",
    label: "Non Competition Venues",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1400&q=80",
    imageLabel: "Non-Competition Venues – Doha 2030",
    tag: "Operations",
    title: "Supporting the Games Experience",
    body: [
      "Non-competition venues include the Main Press Centre (MPC), the International Broadcast Centre (IBC), accreditation centres, and official conference facilities — all key to a successful, well-run Games.",
      "These facilities have been selected for their strategic location, capacity, and connectivity to ensure seamless operations for the media, broadcast community, and Games officials.",
    ],
    stats: [
      { number: "1", label: "Main Press Centre" },
      { number: "1", label: "Broadcast Centre" },
      { number: "5", label: "Operations Hubs" },
    ],
  },
  {
    id: "ceremonies-venue",
    label: "Ceremonies Venue",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=80",
    imageLabel: "Ceremonies Venue – Doha 2030",
    tag: "Ceremonies",
    title: "Unforgettable Opening & Closing Ceremonies",
    body: [
      "The Opening and Closing Ceremonies of the Doha 2030 Asian Games will be spectacular celebrations of sport, culture, and the spirit of Asia — staged at a landmark venue in the heart of Doha.",
      "The ceremonies will showcase Qatar's rich heritage while projecting its bold vision for the future, creating memories that will last a lifetime for athletes and spectators from across the continent.",
    ],
    stats: [
      { number: "80,000+", label: "Spectator Capacity" },
      { number: "45", label: "OCA Member Nations" },
      { number: "2", label: "Major Ceremonies" },
    ],
  },
  {
    id: "competition-venues",
    label: "Competition Venues",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1400&q=80",
    imageLabel: "Competition Venues – Doha 2030",
    tag: "Competition",
    title: "Premier Competition Venues",
    body: [
      "Doha's competition venues represent the pinnacle of sports infrastructure. Each facility has been selected based on the technical requirements of its respective International Federation and has been tested through previous high-profile events.",
      "Venues are grouped into strategic clusters across the city, ensuring efficient athlete and spectator movement, with all sites accessible within 30 minutes of the Athletes' Village.",
    ],
    stats: [
      { number: "35+", label: "Competition Arenas" },
      { number: "10", label: "Venue Clusters" },
      { number: "8", label: "Cities / Zones" },
    ],
    subVenues: [
      { name: "Khalifa Tennis & Squash International Sports Complex", tag: "Tennis · Squash" },
      { name: "Qatar Foundation Sports Complex", tag: "Multi-sport" },
      { name: "Al Rayyan Sports Complex", tag: "Football · Athletics" },
      { name: "Lusail Sports Complex", tag: "Cycling · Archery" },
      { name: "Al Gharaffa Sports Complex", tag: "Basketball · Handball" },
      { name: "Al Sadd Sports Complex", tag: "Wrestling · Boxing" },
      { name: "Aspire Zone", tag: "Athletics · Aquatics" },
      { name: "Southern Stand-Alone Venues", tag: "Equestrian · Shooting" },
      { name: "Northern Stand-Alone Venues", tag: "Sailing · Rowing" },
      { name: "Katara-Lusail Coastal Zone", tag: "Beach Volleyball · Triathlon" },
    ],
  },
];

/* ── Component ─────────────────────────────────────────── */
export default function VenuesPage() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const [activeSubVenue, setActiveSubVenue] = useState(null);
  const [fading, setFading] = useState(false);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  const handleTabChange = (id) => {
    if (id === activeTabId) return;
    setFading(true);
    setTimeout(() => {
      setActiveTabId(id);
      setActiveSubVenue(null);
      setFading(false);
    }, 260);
  };

  return (
    <>
      {/* ── Generic inner-page banner (eyebrow / title / breadcrumb) ── */}
      <InnerPageBanner
        title="Sports & Venues"
        eyebrow="Doha 2030 Asian Games"
        image="https://deweb-519a7.b-cdn.net/post-images/133e3759-278d-4f2e-a543-0a8674294313.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sports & Venues" },
        ]}
      />

      {/* ── Main Content ─────────────────────────── */}
      <main className={styles.mainContent}>
        <div className={styles.contentLayout}>

          {/* ── Left Side Tabs ─────────────────── */}
          <aside className={styles.tabsColumn} aria-label="Venue categories">
            <div className={styles.tabsSectionTitle}>Sports &amp; Venues</div>
            {TABS.map((tab) => (
              <div key={tab.id}>
                <button
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={activeTabId === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  className={`${styles.tabBtn} ${activeTabId === tab.id ? styles.tabBtnActive : ""}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>

                {/* Sub-venue accordion — Competition Venues only */}
                {tab.subVenues && (
                  <ul
                    className={`${styles.subTabList} ${activeTabId === tab.id ? styles.subTabListOpen : ""}`}
                    role="tablist"
                    aria-label="Competition venues"
                  >
                    {tab.subVenues.map((sv, i) => (
                      <li key={i}>
                        <button
                          className={`${styles.subTabBtn} ${activeSubVenue === i ? styles.subTabBtnActive : ""}`}
                          onClick={() => setActiveSubVenue(activeSubVenue === i ? null : i)}
                        >
                          {sv.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </aside>

          {/* ── Right Content Panel ─────────────── */}
          <section
            id={`panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.id}`}
            className={styles.contentPanel}
          >
            <div className={`${styles.contentInner} ${fading ? styles.contentFading : ""}`}>
              {/* Panel image */}
              <div className={styles.contentImageWrap}>
                <div
                  className={styles.contentImageBg}
                  style={{ backgroundImage: `url(${activeTab.image})` }}
                />
                <div className={styles.contentImageOverlay} />
                <span className={styles.contentImageLabel}>{activeTab.imageLabel}</span>
              </div>

              {/* Body */}
              <div className={styles.contentBody}>
                <span className={styles.contentSectionTag}>{activeTab.tag}</span>
                <h2 className={styles.contentTitle}>{activeTab.title}</h2>
                {activeTab.body.map((para, i) => (
                  <p key={i} className={styles.contentText}>{para}</p>
                ))}

                {/* Stats */}
                {activeTab.stats && (
                  <div className={styles.statsRow}>
                    {activeTab.stats.map((s, i) => (
                      <div key={i} className={styles.statItem}>
                        <span className={styles.statNumber}>{s.number}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-venue grid */}
                {activeTab.subVenues && (
                  <div className={styles.venueGrid}>
                    {activeTab.subVenues.map((sv, i) => (
                      <div
                        key={i}
                        className={`${styles.venueCard} ${activeSubVenue === i ? styles.venueCardActive : ""}`}
                        onClick={() => setActiveSubVenue(activeSubVenue === i ? null : i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setActiveSubVenue(activeSubVenue === i ? null : i)}
                      >
                        <div className={styles.venueCardName}>{sv.name}</div>
                        <div className={styles.venueCardTag}>{sv.tag}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
