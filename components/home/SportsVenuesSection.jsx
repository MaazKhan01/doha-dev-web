"use client";
import styles from "./SportsVenuesSection.module.css";

const venues = [
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
  {
    id: "venue-3",
    label: "Ahmad Bin Ali Stadium",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
  },
  {
    id: "venue-4",
    label: "Khalifa International Stadium",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=900&q=80",
    wide: true,
  },
  {
    id: "venue-5",
    label: "Education City Stadium",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=900&q=80",
  },
];

/* Faint geometric emblem */
function GeoEmblem() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className={styles.emblem}>
      {[...Array(12)].map((_, i) => {
        const x = (i % 4) * 220 + 30;
        const y = Math.floor(i / 4) * 210 + 30;
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <polygon points="90,10 170,50 170,130 90,170 10,130 10,50" fill="none" stroke="#8B1A1A" strokeWidth="1.5"/>
            <polygon points="90,30 150,60 150,120 90,150 30,120 30,60" fill="none" stroke="#8B1A1A" strokeWidth="0.75"/>
            <circle cx="90" cy="90" r="20" fill="none" stroke="#8B1A1A" strokeWidth="1"/>
          </g>
        );
      })}
    </svg>
  );
}

export default function SportsVenuesSection() {
  return (
    <section id="sports-venues" className={styles.section}>
      <GeoEmblem />

      <div className={styles.header}>
        <h2 className={styles.title}>Sports and Venues</h2>
        <p className={styles.subtitle}>
          World-class facilities to host the 21st Asian Games
        </p>
      </div>

      <div className={styles.collage}>
        {venues.map((v) => (
          <div
            key={v.id}
            id={v.id}
            className={`${styles.card} ${v.wide ? styles.cardWide : ""}`}
          >
            <div
              className={styles.cardBg}
              style={{ backgroundImage: `url(${v.image})` }}
            />
            <div className={styles.cardOverlay} />
            <span className={styles.cardLabel}>{v.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
