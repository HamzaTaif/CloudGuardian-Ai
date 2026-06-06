import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Background grid effect */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Cloud Operations
        </div>

        <h1 className={styles.heading}>
          Your Cloud Infrastructure,
          <br />
          <span className={styles.headingGradient}>Intelligently Managed</span>
        </h1>

        <p className={styles.subheading}>
          CloudGuardian AI acts as your always-on cloud advisor — reducing costs,
          diagnosing incidents, and notifying your team before small problems
          become outages.
        </p>

        <div className={styles.ctas}>
          <a href="#demo" className={styles.ctaPrimary}>
            View Live Demo
            <span className={styles.arrow}>→</span>
          </a>
          <a href="#modules" className={styles.ctaSecondary}>
            Explore Modules
          </a>
        </div>

        {/* Mock terminal card */}
        <div className={styles.terminal} aria-label="Sample AI output">
          <div className={styles.terminalHeader}>
            <span className={styles.dot} style={{ background: "#ef4444" }} />
            <span className={styles.dot} style={{ background: "#f59e0b" }} />
            <span className={styles.dot} style={{ background: "#10b981" }} />
            <span className={styles.terminalTitle}>cloudguardian — ai-analyst</span>
          </div>
          <div className={styles.terminalBody}>
            <p><span className={styles.tGreen}>✓</span> Log stream connected — 1,247 events parsed</p>
            <p><span className={styles.tRed}>✗</span> ERROR: Database Connection Failed detected</p>
            <p><span className={styles.tYellow}>→</span> Root Cause: <span className={styles.tWhite}>Expired Database Credentials</span></p>
            <p><span className={styles.tYellow}>→</span> Severity: <span className={styles.tRed}>Critical</span> / Priority: <span className={styles.tRed}>High</span></p>
            <p><span className={styles.tBlue}>⚡</span> Recovery: Rotate credentials → Restart db service</p>
            <p><span className={styles.tGreen}>✓</span> Notifications dispatched — Email, Slack, Teams</p>
          </div>
        </div>
      </div>
    </section>
  );
}
