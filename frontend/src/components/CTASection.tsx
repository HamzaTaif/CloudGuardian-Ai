import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section id="cta" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Ready to put your cloud on autopilot?
        </h2>
        <p className={styles.sub}>
          Get full visibility into costs and incidents from day one. No
          configuration overhead — just connect and let the AI work.
        </p>
        <div className={styles.actions}>
          <a href="#modules" className={styles.btnPrimary}>
            Explore the Platform →
          </a>
          <a href="https://github.com" className={styles.btnOutline} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
