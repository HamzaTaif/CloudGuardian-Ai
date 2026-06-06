import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>⛨</span>
          <span className={styles.logoText}>
            Cloud<span className={styles.logoAccent}>Guardian</span> AI
          </span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#features">Features</a>
          <a href="#modules">Modules</a>
          <a href="#demo">Demo</a>
          <a href="#stack">Stack</a>
        </nav>

        <p className={styles.copy}>
          Built for the Ship With Kiro Hackathon
        </p>
      </div>
    </footer>
  );
}
