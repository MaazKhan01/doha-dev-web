"use client";
import Slider from "react-slick";
import styles from "./PressReleasesSection.module.css";

const articles = [
  {
    id: "pr-1",
    image: "https://images.unsplash.com/photo-1585858229735-cd08d8cb510d?w=900&q=80",
    title: "Doha 2030 promises magical Games experience for OCA",
    date: "15 March 2024",
  },
  {
    id: "pr-2",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80",
    title: "Doha Bolstered by World-Class Partners for 2030 Asian Games Bid",
    date: "02 February 2024",
  },
  {
    id: "pr-3",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
    title: "Olympians, World Champions and Asian Games medallists among committee",
    date: "20 January 2024",
  },
  {
    id: "pr-4",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=900&q=80",
    title: "Doha 2030 looks to the future with launch of Youth Working Group",
    date: "10 December 2023",
  },
  {
    id: "pr-5",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
    title: "Doha reinforces commitment to sustainability with Green Games pledge",
    date: "05 November 2023",
  },
];

const slickSettings = {
  dots: false,
  infinite: false,
  speed: 450,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 900,  settings: { slidesToShow: 2 } },
    { breakpoint: 600,  settings: { slidesToShow: 1 } },
  ],
};

/* Diagonal stripe SVG background */
function StripeEmblem() {
  return (
    <svg
      viewBox="0 0 1536 900"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.emblem}
      preserveAspectRatio="none"
    >
      {[...Array(30)].map((_, i) => (
        <line
          key={i}
          x1={i * 60 - 200}
          y1="0"
          x2={i * 60 + 400}
          y2="900"
          stroke="#C0C0C0"
          strokeWidth="18"
          opacity="0.55"
        />
      ))}
    </svg>
  );
}

export default function PressReleasesSection() {
  return (
    <section id="press-releases" className={styles.section}>
      <StripeEmblem />

      <div className={styles.header}>
        <h2 className={styles.title}>Press Releases</h2>
        <p className={styles.subtitle}>
          Journalists can download the Asian Games Doha 2030 Bid Media Kit by clicking{" "}
          <a href="#" className={styles.link}>here</a>
        </p>
      </div>

      <div className={styles.sliderWrap}>
        <Slider {...slickSettings}>
          {articles.map((a) => (
            <div key={a.id} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.cardImg}>
                  <div
                    className={styles.cardImgBg}
                    style={{ backgroundImage: `url(${a.image})` }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardTitle}>{a.title}</p>
                  <span className={styles.cardDate}>{a.date}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
