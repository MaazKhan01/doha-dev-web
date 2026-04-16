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

const navLinks = [
  { label: "About Qatar", href: "#about-qatar" },
  { label: "Doha 2030", href: "#doha2030" },
  { label: "Sports & Venues", href: "#sports-venues" },
  { label: "Press Releases", href: "#press-releases" },
  { label: "Gallery", href: "#gallery" },
];

const socialLinks = [
  { icon: <FaYoutube />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaSnapchatGhost />, href: "#" },
];

export default function Navbar({ onSectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onSectionClick) onSectionClick(href.replace("#", ""));
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => window.location.href = "/"}>
          <img src="/en/images/logo.svg" alt="Logo" width={175} />
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
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Social */}
        <div className={styles.social}>
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={(e) => handleNav(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileSocial}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}