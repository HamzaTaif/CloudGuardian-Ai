import styles from "./TechStack.module.css";

const stack = [
  { layer: "Frontend", tech: "React / Next.js", icon: "⚛️", color: "#06b6d4" },
  { layer: "Backend", tech: "Node.js", icon: "🟢", color: "#10b981" },
  { layer: "Database", tech: "MongoDB", icon: "🍃", color: "#10b981" },
  { layer: "AI / LLM", tech: "Claude · OpenAI · Bedrock", icon: "🤖", color: "#8b5cf6" },
  { layer: "Notifications", tech: "SMTP · Slack · MS Teams", icon: "🔔", color: "#f59e0b" },
  { layer: "Infrastructure", tech: "Amazon Web Services", icon: "☁️", color: "#f97316" },
];

export default function TechStack() {
  return (
    <section id="stack" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Technology</p>
          <h2 className={styles.heading}>Built on a proven stack</h2>
        </div>

        <div className={styles.grid}>
          {stack.map((s) => (
            <div key={s.layer} className={styles.item}>
              <span className={styles.icon}>{s.icon}</span>
              <div>
                <p className={styles.layer}>{s.layer}</p>
                <p className={styles.tech} style={{ color: s.color }}>{s.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
