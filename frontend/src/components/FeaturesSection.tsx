import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: "💰",
    title: "Cost Prediction",
    description:
      "Forecast next month's bill before the invoice arrives. Catch spending anomalies early with AI-driven usage trend analysis.",
    accent: "#10b981",
  },
  {
    icon: "📊",
    title: "Cost Explanation",
    description:
      "Get plain-language breakdowns like "Costs increased 37% due to traffic surges and additional compute scaling."",
    accent: "#3b82f6",
  },
  {
    icon: "💡",
    title: "Savings Recommendations",
    description:
      "Actionable tasks — remove idle servers, switch to spot instances, right-size databases — with exact savings estimates.",
    accent: "#f59e0b",
  },
  {
    icon: "🔍",
    title: "Log Analysis",
    description:
      "Feed in raw unstructured logs. The AI parses thousands of events per second and flags critical errors instantly.",
    accent: "#8b5cf6",
  },
  {
    icon: "🎯",
    title: "Root Cause Detection",
    description:
      "No more guessing. CloudGuardian pinpoints exactly why something failed — from expired credentials to misconfigured routes.",
    accent: "#ef4444",
  },
  {
    icon: "🔔",
    title: "Multi-Channel Notifications",
    description:
      "Structured alerts delivered simultaneously to Email, Slack, and Microsoft Teams — rich templates, zero setup friction.",
    accent: "#06b6d4",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Capabilities</p>
          <h2 className={styles.heading}>Everything your cloud team needs</h2>
          <p className={styles.sub}>
            Six core capabilities working together to give you full operational
            visibility and control.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <article key={f.title} className={styles.card}>
              <div
                className={styles.iconWrap}
                style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}33` }}
              >
                <span className={styles.icon}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
