"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";
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

export default function Navbar({ onSectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { loading, data } = useQuery(
    gql`
      ${HEADER}
    `
  );

  const headerData = data?.header?.headerFields;
  const logo = `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${headerData?.logoEn?.node?.filePath}` || "/en/images/logo.svg";
  const navLinks = headerData?.menus?.map(menu => ({
    label: menu.nameEn,
    href: menu.urlEn
  })) || [];

  const socialLinks = headerData?.socialIcons?.map(social => ({
    icon: social.icon?.node?.mediaItemUrl ? `${process.env.NEXT_PUBLIC_WP_URL?.replace(/\/$/, '')}${social.icon?.node?.mediaItemUrl}` : null,
    href: social.link,
    title: social.title
  })) || [];

  const handleNav = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onSectionClick && href.startsWith("#")) {
      onSectionClick(href?.replace("#", ""));
    } else {
      window.location.href = href;
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (loading) return null;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => window.location.href = "/"}>
          <img src={logo} alt="Logo" width={175} style={{ padding: '10px 0' }} />
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
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
            <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.title}>
              {s.icon ? <img src={s.icon} alt={s.title} width={20} height={20} /> : s.title}
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