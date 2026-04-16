"use client";
import { useState } from "react";
import styles from "./AboutDoha2030Section.module.css";
import RightOffcanvas from "@/components/ui/RightOffcanvas";

const DOHA_DETAIL = {
  tag: "About Doha 2030",
  heading: "Our Home, Your Gateway",
  image: "https://agdoha2030.qa/themes/doha2030/images/MIA_Museum-011.jpg",
  body: [
    "A Doha 2030 Asian Games will provide a gateway to a brighter future for the Olympic Council of Asia (OCA), Asian National Olympic Committees (NOCs), the Asian Sports Federations and Qatar. The Games will deliver a lasting, sustainable Asian Olympic legacy through a celebration of sport for life, peaceful diversity, excellence and certainty.",
    "Qatar is uniquely positioned to host the Asian Games. Its world-class infrastructure, compact geography and proven track record of delivering major international sporting events make it the ideal host nation for Asia's premier multi-sport Games.",
    "Doha 2030 will build on the legacy of previous events held in Qatar — including the 2006 Asian Games, the 2011 Arab Games, the 2019 ANOC World Beach Games, and the FIFA World Cup Qatar 2022 — to create an unparalleled sporting experience for athletes, officials and fans from across the continent.",
    "The Games will showcase the best of Qatari culture, heritage and hospitality while serving as a platform to promote sports participation, youth development and regional unity across all 45 OCA member nations.",
    "With a compact venue footprint, state-of-the-art facilities, and a fully connected host city, Doha 2030 promises to be the most efficiently organised and atmospherically vibrant Asian Games in the event's history.",
  ],
};

export default function AboutDoha2030Section() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="doha2030" className={styles.section}>
        {/* Section header band */}
        <div className={`${styles.header} container mx-auto`}>
          <h2 className="header-title">About Doha 2030</h2>
        </div>

        {/* Main body */}
        <div className={styles.body}>
          <div className="container mx-auto h-full flex items-center">
            {/* Background image */}
            <div
              className={styles.bgImage}
              style={{
                backgroundImage:
                  "url(https://agdoha2030.qa/themes/doha2030/images/MIA_Museum-011.jpg)",
              }}
            />

            {/* Teal glass panel */}
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                Our Home<br />your Gateway
              </h3>
              <p className={styles.panelText}>
                A Doha 2030 Asian Games will provide a gateway to a brighter future
                for Olympic Council of Asia (OCA), Asian National Olympic Committees
                (NOCs), the Asian Sports Federations and Qatar. The Games will deliver
                a lasting sustainable Asian Olympic legacy through a celebration of
                sport for life, peaceful diversity, excellence and certainty.
              </p>
              <button className={styles.cta} onClick={() => setOpen(true)}>
                Find out more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Right Offcanvas ── */}
      <RightOffcanvas
        open={open}
        onClose={() => setOpen(false)}
        image={DOHA_DETAIL.image}
        tag={DOHA_DETAIL.tag}
        heading={DOHA_DETAIL.heading}
      >
        {DOHA_DETAIL.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </RightOffcanvas>
    </>
  );
}
