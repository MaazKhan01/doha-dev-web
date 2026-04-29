"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaSnapchatGhost,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { gql, useQuery } from "@apollo/client";
import { HEADER } from "@/utils/graphQueries";

export default function Navbar({
  onSectionClick,
  activeSectionId
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Check if NOT home (/en OR /ar) or any id page (#)
const isNotHome =
  (pathname !== "/en" && pathname !== "/ar") ||
  window.location.hash !== "";

  // Detect scroll state based on active section instead of window.scrollY
  useEffect(() => {
    if (!activeSectionId && isNotHome) return;

    // Make navbar small starting from the second section onwards
    const shouldBeScrolled = activeSectionId !== "home";

    setIsScrolled(shouldBeScrolled);
  }, [activeSectionId]);

  const { loading, data } = useQuery(gql`${HEADER}`);

  const headerData = data?.header?.headerFields;

  const logoUrl = headerData?.logoEn?.node?.filePath
    ? `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${headerData.logoEn.node.filePath}`
    : "/en/images/logo.svg";

  const navLinks = headerData?.menus?.map(menu => ({
    label: menu.nameEn,
    href: menu.urlEn
  })) || [];

  const socialLinks = headerData?.socialIcons?.map(social => ({
    icon: social.icon?.node?.mediaItemUrl
      ? `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${social.icon.node.mediaItemUrl}`
      : null,
    href: social.link,
    title: social.title
  })) || [];

  const handleNav = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      const sectionId = href.slice(1);
      const isHome = pathname === "/en" || pathname === "/ar" || pathname === "/";

      if (isHome && onSectionClick) {
        // On homepage — delegate to the section-scroll system
        onSectionClick(sectionId);
      } else {
        // On any inner page — navigate to the home page and let it scroll
        const lang = pathname.split("/")[1] || "en";
        window.location.href = `/${lang}${href}`;
      }
    } else {
      window.location.href = href;
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (loading) return null;

  return (
    <nav
      className={`
    ${styles.navbar} 
    ${isScrolled ? styles.scrolled : ""} 
    ${isNotHome ? styles.relative : ""}
  `}
    >
      <div className={styles.container}>
        {/* Logo */}
        <div
          className={styles.logo}
          onClick={() => window.location.href = "/"}
        >
          <img
            src={logoUrl}
            alt="Logo"
            width={isScrolled ? 140 : 180}
            style={{
              padding: isScrolled ? '6px 0' : '10px 0',
              transition: 'all 0.35s ease'
            }}
          />
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes color="#C0392B" /> : <FaBars color="#C0392B" />}
        </button>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((l, index) => (
            <li key={index}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Social */}
        <div className={styles.social}>
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.title}
            >
              {s.icon ? <img src={s.icon} alt={s.title} width={20} height={20} style={{ height: "18px" }} /> : s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((l, index) => (
              <li key={index}>
                <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileSocial}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.title}>
                {s.icon ? <img src={s.icon} alt={s.title} width={24} height={24} /> : s.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}