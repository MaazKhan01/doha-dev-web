"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./AboutQatarSection.module.css";

const tabData = {
  "practical-info": {
    label: "Practical Information",
    tabs: [
      {
        id: "business-hours",
        label: "Business Hours",
        image: "https://images.unsplash.com/photo-1555374018-13a8994ab246?w=1200&q=80",
        description: "The work week is from Sunday to Thursday, with most offices closed on Friday (the Islamic holy day) and Saturday. Government offices open and close early – generally from around 07:00 to 14:00. Commercial offices typically run from 08:00 to 17:00 during the week.",
      },
      {
        id: "climate",
        label: "Climate",
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
        description: "Qatar has a hot desert climate. Summers (June–September) are extremely hot and humid with temperatures soaring above 40°C. Winters (December–February) are mild and pleasant, averaging around 18°C. The Asian Games will be held during the cooler months to ensure athlete and spectator comfort.",
      },
      {
        id: "language",
        label: "Language",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
        description: "Arabic is the official language of Qatar. English is widely spoken and understood in hotels, restaurants, malls, and tourist areas making it easy for international visitors to navigate. Official signage across Doha is bilingual in Arabic and English.",
      },
      {
        id: "time",
        label: "Time",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&q=80",
        description: "Qatar operates on AST (Arabia Standard Time) which is UTC+3. Qatar does not observe daylight saving time, meaning the time offset remains constant throughout the year. This makes scheduling across time zones straightforward for international visitors and media.",
      },
      {
        id: "national",
        label: "National Profile – Key Facts",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
        description: "Qatar is a sovereign Arab state in the Middle East with a population of approximately 3 million. It is one of the world's largest exporters of liquefied natural gas (LNG). Doha is the capital and largest city. Qatar is renowned for its modern infrastructure and ambitious vision for the future.",
      },
    ]
  },
  "guidelines-safety": {
    label: "Guidelines & Safety",
    tabs: [
      {
        id: "disability",
        label: "Visitors With A Disability",
        image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200&q=80",
        description: "Qatar is committed to ensuring all visitors enjoy the Games experience. Venues are fully accessible with ramps, elevators, and dedicated viewing areas. Special transportation services and assistance programmes are available for visitors with disabilities.",
      },
      {
        id: "dress-code",
        label: "Dress Code",
        image: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=1200&q=80",
        description: "Qatar is a Muslim country and modest dress is expected, especially in public spaces, malls, and religious sites. At sporting venues a more relaxed dress code applies. Visitors are encouraged to respect local customs by avoiding overly revealing attire in public spaces.",
      },
      {
        id: "female",
        label: "Female Visitors",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
        description: "Female visitors are welcome and safe in Qatar. Qatar has invested heavily in safety infrastructure and female tourists visit freely without restrictions. Women can dress according to Islamic norms but there are no laws requiring non-Muslim women to wear a hijab.",
      },
      {
        id: "religion",
        label: "Religion",
        image: "https://images.unsplash.com/photo-1518730878755-08cb3e42e2e8?w=1200&q=80",
        description: "Islam is the state religion of Qatar. Residents and visitors of all faiths are welcome and respected. During Ramadan, eating, drinking, and smoking in public during daylight hours is prohibited. Places of worship for non-Muslims are also available in Doha.",
      },
      {
        id: "safety",
        label: "Safety",
        image: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1200&q=80",
        description: "Qatar is one of the safest countries in the world. Crime rates are extremely low and solo travel is considered very safe. The government maintains a strong security presence in public areas and has a zero-tolerance policy on drugs. Emergency services respond swiftly.",
      },
    ]
  }
};

const mainTabKeys = Object.keys(tabData);

/* Wavy circular background emblem */
function WavyEmblem() {
  return (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className={styles.emblem}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <circle key={n} cx="80" cy="300" r={n * 55} fill="none" stroke="white" strokeWidth="1" opacity={0.18 - n * 0.015} />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <circle key={`b${n}`} cx="80" cy="300" r={n * 55 - 27} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 5" opacity={0.1} />
      ))}
    </svg>
  );
}

export default function AboutQatarSection() {
  const [activeMainTab, setActiveMainTab] = useState(mainTabKeys[0]);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [animating, setAnimating] = useState(false);

  const currentTabs = tabData[activeMainTab].tabs;
  const currentTab = currentTabs[activeSubTab];

  const handleMainTabChange = (key) => {
    if (key === activeMainTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveMainTab(key);
      setActiveSubTab(0); // Reset nested tab when main tab changes
      setAnimating(false);
    }, 300);
  };

  const handleSubTabChange = (idx) => {
    if (idx === activeSubTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSubTab(idx);
      setAnimating(false);
    }, 300);
  };

  return (
    <section id="about-qatar" className={styles.section}>
      <WavyEmblem />

      {/* Inner layout with main tabs on top */}
      <div className={styles.innerWrapper}>
           <div className={styles.container}>
     <div className={styles.mainTabsHeader}>
          {mainTabKeys.map(key => (
            <button
              key={key}
              className={`${styles.mainTabBtn} ${activeMainTab === key ? styles.mainTabBtnActive : ""}`}
              onClick={() => handleMainTabChange(key)}
            >
              {tabData[key].label}
            </button>
          ))}
        </div>
          <div className={styles.contentArea}>
            {/* Vertical Tabs Column */}
            <div className={styles.tabsCol}>
              {currentTabs.map((t, i) => (
                <button
                  key={t.id}
                  className={`${styles.tabBtn} ${i === activeSubTab ? styles.tabBtnActive : ""}`}
                  onClick={() => handleSubTabChange(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content Column */}
            <div className={styles.contentCol}>
              {/* Image */}
              <div className={styles.imageWrap}>
                <div
                  className={`${styles.image} ${animating ? styles.imageOut : styles.imageIn}`}
                  style={{ backgroundImage: `url(${currentTab.image})` }}
                />
                <div className={styles.imageLabel}>{currentTab.label}</div>
              </div>

              {/* Description */}
              <div className={`${styles.descBox} ${animating ? styles.descOut : styles.descIn}`}>
                {currentTab.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
