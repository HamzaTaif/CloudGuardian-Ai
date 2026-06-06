import styles from "./ModulesSection.module.css";

const modules = [
  {
    number: "01",
    title: "AI Cloud CFO",
    color: "#10b981",
    description:
      "Your automated cloud financial advisor. Monitors usage, forecasts bills, explains budget drivers, and finds savings opportunities.",
    capabilities: ["Cost Prediction", "Cost Explanation", "Savings Recommendations", "Resource Optimization"],
  },
  {
    number: "02",
    title: "AI Incident Analyst",
    color: "#3b82f6",
    description:
      "Your automated cloud engineer. Parses log streams, identifies root causes, classifies severity, and generates step-by-step recovery plans.",
    capabilities: ["Log Analysis", "Root Cause Detection", "Severity Assessment", "Recovery Recommendations"],
  },
  {
    number: "03",
    title: "Notification Center",
    color: "#8b5cf6",
    description:
      "Keeps every stakeholder informed. Rich, structured templates delivered via Email, Slack webhooks, and Microsoft Teams cards.",
    capabilities: ["Email Notifications", "Slack Alerts", "MS Teams Cards", "Custom Templates"],
  },
  {
    number: "04",
    title: "Unified Dashboard",
    color: "#f59e0b",
    description:
      "Single pane of glass for your cloud operations. Cost trends, active incidents, recovery timelines, and optimization history.",
    capabilities: ["Cost Dashboard", "Incident Dashboard", "Reports Dashboard", "Real-time Updates"],
  },
];

export default function ModulesSection() {
  return (
    <section id="modules" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Architecture</p>
          <h2 className={styles.heading}>Four modules, one platform</h2>
          <p className={styles.sub}>
            Each module is independently focused but fully integrated — data flows
            between them automatically.
          </p>
        </div>

        <div className={styles.grid}>
          {modules.map((m) => (
            <article key={m.number} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.number} style={{ color: m.color }}>
                  {m.number}
                </span>
                <div
                  className={styles.line}
                  style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
                />
              </div>
              <h3 className={styles.title} style={{ color: m.color }}>
                {m.title}
              </h3>
              <p className={styles.desc}>{m.description}</p>
              <ul className={styles.caps}>
                {m.capabilities.map((cap) => (
                  <li key={cap} className={styles.cap}>
                    <span className={styles.capDot} style={{ background: m.color }} />
                    {cap}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
