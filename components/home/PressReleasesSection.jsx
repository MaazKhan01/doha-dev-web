"use client";
import { useState } from "react";
import Slider from "react-slick";
import styles from "./PressReleasesSection.module.css";
import RightOffcanvas from "@/components/ui/RightOffcanvas";

const articles = [
  {
    id: "pr-1",
    image: "https://images.unsplash.com/photo-1585858229735-cd08d8cb510d?w=900&q=80",
    title: "Doha 2030 promises magical Games experience for OCA",
    date: "15 March 2024",
    tag: "Press Release",
    body: [
      "Doha 2030 has promised to deliver a magical Asian Games experience for the Olympic Council of Asia (OCA) and all participating nations. Speaking at a high-level briefing in Doha, organisers outlined a comprehensive vision for an event that places athletes at the centre of everything.",
      "The Games will be held across a compact, highly connected venue footprint, with all competition and non-competition facilities clustered within the city of Doha. This design ensures that athletes, officials and fans can move efficiently between venues without the lengthy travel times that have burdened previous editions.",
      "OCA leadership praised Qatar's commitment to operational excellence, noting that the country's experience hosting the FIFA World Cup Qatar 2022, the 2006 Asian Games and numerous world championship events provides a strong foundation for delivering a flawless 2030 Games.",
      "\"Doha is ready,\" said a senior Doha 2030 official. \"Our venues are tested, our infrastructure is world-class, and our people are passionate about sport. We will welcome Asia to Doha with open arms.\"",
    ],
  },
  {
    id: "pr-2",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80",
    title: "Doha Bolstered by World-Class Partners for 2030 Asian Games Bid",
    date: "02 February 2024",
    tag: "Partnership",
    body: [
      "Doha 2030 has announced a series of major partnership agreements with world-class organisations to support the planning and delivery of the 2030 Asian Games. The partnerships span technology, hospitality, media, transport and sustainability.",
      "Among the key partners announced are leading international sports management firms, global broadcast groups and technology companies with proven experience delivering solutions for the world's largest sporting events.",
      "The partnerships are expected to bring significant investment, expertise and innovation to the Doha 2030 project, supporting the Games' ambition to be the most technologically advanced Asian Games in history.",
      "Qatar's strong record of attracting global partners for major events — demonstrated most visibly by the success of the FIFA World Cup 2022 — has been cited as a key factor in securing these agreements ahead of schedule.",
    ],
  },
  {
    id: "pr-3",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=900&q=80",
    title: "Olympians, World Champions and Asian Games medallists among committee",
    date: "20 January 2024",
    tag: "People",
    body: [
      "Doha 2030 has revealed the composition of its Athletes' Advisory Committee, a body made up of current and former elite athletes drawn from across the Asian continent. The committee includes Olympic gold medallists, Asian Games champions and world record holders from a range of sports disciplines.",
      "The Athletes' Advisory Committee will play a central role in shaping the Games experience, providing direct input into venue planning, competition schedules, accommodation standards and athlete welfare programmes.",
      "\"Athletes must be at the heart of everything we do,\" said the Committee Chair. \"This body will ensure that the voices of Asia's finest competitors are heard at every stage of the planning process.\"",
      "The committee is expected to meet quarterly and will publish regular updates on its work, recommendations and progress to promote transparency and athlete engagement ahead of the Games.",
    ],
  },
  {
    id: "pr-4",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=900&q=80",
    title: "Doha 2030 looks to the future with launch of Youth Working Group",
    date: "10 December 2023",
    tag: "Youth",
    body: [
      "Doha 2030 has established a dedicated Youth Working Group to develop youth engagement programmes connected to the Asian Games. The group will focus on using the Games as a platform to promote sport participation among young people across Qatar and the wider Asia region.",
      "The Working Group will design educational initiatives, community outreach projects and digital engagement campaigns targeted at young people aged 10 to 24. It will work in partnership with schools, universities and youth organisations across Qatar and the OCA member nations.",
      "Asia is home to more than 2 billion young people and Doha 2030 is committed to inspiring the next generation of athletes and sports fans through the power of the Asian Games.",
      "The Youth Working Group will present its initial recommendations to the Doha 2030 organising committee by mid-2024, with key programmes expected to launch in the lead-up to the Games.",
    ],
  },
  {
    id: "pr-5",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
    title: "Doha reinforces commitment to sustainability with Green Games pledge",
    date: "05 November 2023",
    tag: "Sustainability",
    body: [
      "Doha 2030 has formally committed to delivering the most sustainable Asian Games in the event's history, publishing a comprehensive Green Games framework that sets ambitious targets across energy, waste, water, transport and procurement.",
      "The framework commits Doha 2030 to achieving net-zero carbon emissions across all Games operations, using 100% renewable energy at competition venues, and diverting a minimum of 90% of Games waste from landfill.",
      "Qatar's investment in renewable energy infrastructure — including the significant expansion of solar capacity ahead of the FIFA World Cup 2022 — will form the backbone of the Green Games energy strategy.",
      "\"Sustainability is not an add-on for Doha 2030 — it is central to our entire vision,\" said the Head of Sustainability. \"We are committed to setting a new benchmark for responsible event hosting that inspires other major sporting events around the world.\"",
      "The Green Games framework has been independently verified by a leading environmental consultancy and is aligned with the International Olympic Committee's Agenda 2020+5 sustainability guidelines.",
    ],
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

export default function PressReleasesSection() {
  const [selected, setSelected] = useState(null); // article object or null

  return (
    <>
      <section id="press-releases" className={styles.section}>
        <div className="container">
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
                      {/* View more overlay — appears on hover via CSS */}
                      <button
                        className={styles.viewMoreBtn}
                        onClick={() => setSelected(a)}
                        aria-label={`View more: ${a.title}`}
                      >
                        View more
                      </button>
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
        </div>
      </section>

      {/* ── Right Offcanvas ── */}
      {selected && (
        <RightOffcanvas
          open={!!selected}
          onClose={() => setSelected(null)}
          image={selected.image}
          tag={selected.tag}
          heading={selected.title}
          date={selected.date}
        >
          {selected.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </RightOffcanvas>
      )}
    </>
  );
}
