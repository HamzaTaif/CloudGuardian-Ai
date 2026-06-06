"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⛨</span>
          <span className={styles.logoText}>
            Cloud<span className={styles.logoAccent}>Guardian</span> AI
          </span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li><a href="#features">Features</a></li>
          <li><a href="#modules">Modules</a></li>
          <li><a href="#demo">Demo</a></li>
          <li><a href="#stack">Stack</a></li>
        </ul>

        {/* CTA */}
        <div className={styles.actions}>
          <a href="#demo" className={styles.btnOutline}>See Demo</a>
          <a href="#cta" className={styles.btnPrimary}>Get Started</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.barOpen : styles.bar} />
          <span className={menuOpen ? styles.barMid : styles.bar} />
          <span className={menuOpen ? styles.barOpen : styles.bar} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#modules" onClick={() => setMenuOpen(false)}>Modules</a>
          <a href="#demo" onClick={() => setMenuOpen(false)}>Demo</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#cta" className={styles.mobileCTA} onClick={() => setMenuOpen(false)}>
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
