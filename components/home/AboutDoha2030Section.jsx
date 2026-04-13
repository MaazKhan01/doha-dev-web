"use client";
import styles from "./AboutDoha2030Section.module.css";

export default function AboutDoha2030Section() {
  return (
    <section id="doha2030" className={styles.section}>
      {/* Section header band */}
      <div className={`${styles.header} container mx-auto`}>
        <h2 className={styles.headerTitle}>About Doha 2030</h2>
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
            <button className={styles.cta}>Find out more</button>
          </div>
        </div>

      </div>
    </section>
  );
}
