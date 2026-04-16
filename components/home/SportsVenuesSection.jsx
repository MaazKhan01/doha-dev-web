"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
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
            <polygon points="90,10 170,50 170,130 90,170 10,130 10,50" fill="none" stroke="#8B1A1A" strokeWidth="1.5" />
            <polygon points="90,30 150,60 150,120 90,150 30,120 30,60" fill="none" stroke="#8B1A1A" strokeWidth="0.75" />
            <circle cx="90" cy="90" r="20" fill="none" stroke="#8B1A1A" strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
}

export default function SportsVenuesSection() {
  const params = useParams();
  const lang = params?.lang || "en";

  return (
    <section id="sports-venues" className={styles.section + " container"}>
      <GeoEmblem />
      <div className="flex items-center">
        <div className={styles.content}>
          <h2 className="header-title">Sports and Venues</h2>
          <p className={styles.subtitle}>
            Doha&apos;s competition and non-competition venues are centrally located on a compact Games footprint. Venues have been selected taking into account the technical requirements of their respective International Federation (IF) sports and facilities requirements, been strategically located within the city network for ease of access and above all, are &ldquo;tested&rdquo; facilities, used in previous staged World Championships and Games (Doha 2006 Asian Games / Doha 2011 Arab Games / 2019 ANOC World Beach Games).
          </p>
          <div className="flex justify-end bg-[#b3331d]">
            <Link href={`/${lang}/venues`}>
              <button className={styles.btn}>Find out more</button>
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/en/images/img-venue.png" alt="" />
        </div>
      </div>
    </section>
  );
}
