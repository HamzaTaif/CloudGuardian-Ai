import styles from "./StatsBar.module.css";

const stats = [
  { value: "$4,200", label: "Monthly savings identified", color: "#10b981" },
  { value: "<2 min", label: "Avg. incident detection time", color: "#3b82f6" },
  { value: "3", label: "Notification channels", color: "#8b5cf6" },
  { value: "4", label: "AI-powered modules", color: "#f59e0b" },
];

export default function StatsBar() {
  return (
    <section className={styles.statsBar} aria-label="Platform highlights">
      <div className={styles.inner}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value} style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
