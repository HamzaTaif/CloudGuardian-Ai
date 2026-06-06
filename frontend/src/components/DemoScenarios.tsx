"use client";
import { useState } from "react";
import styles from "./DemoScenarios.module.css";

const scenarios = [
  {
    id: "traffic",
    label: "Traffic Spike",
    badge: "Cost Event",
    badgeColor: "#10b981",
    title: "Infrastructure Traffic Spike",
    description:
      "Concurrent user traffic spikes by 500%, triggering rapid compute scaling and database expansion.",
    steps: [
      {
        icon: "📈",
        label: "Detection",
        detail: "AI Cloud CFO detects 500% traffic growth and abnormal resource provisioning",
      },
      {
        icon: "💸",
        label: "Forecast",
        detail: "Predicted Monthly Bill: $18,500 — up from baseline $13,600",
      },
      {
        icon: "💡",
        label: "Recommendations",
        detail: "Migrate worker nodes to Spot Instances • Downsize over-provisioned databases",
      },
      {
        icon: "✅",
        label: "Savings",
        detail: "Potential savings identified: $4,200/month",
      },
    ],
  },
  {
    id: "db",
    label: "Database Failure",
    badge: "Critical Incident",
    badgeColor: "#ef4444",
    title: "Critical Database Connection Failure",
    description:
      "A standard database log exception triggers the full AI Incident Analyst pipeline.",
    steps: [
      {
        icon: "🔍",
        label: "Log Parsed",
        detail: 'ERROR: Database Connection Failed detected in 1,247 log events',
      },
      {
        icon: "🎯",
        label: "Root Cause",
        detail: "Root Cause: Expired Database Credentials",
      },
      {
        icon: "⚠️",
        label: "Severity",
        detail: "Severity: Critical / Priority: High — immediate action required",
      },
      {
        icon: "🔔",
        label: "Notified",
        detail: "Recovery plan dispatched → Email, Slack, Microsoft Teams",
      },
    ],
  },
];

export default function DemoScenarios() {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Live Demo</p>
          <h2 className={styles.heading}>See CloudGuardian AI in action</h2>
          <p className={styles.sub}>
            Two reference scenarios showing exactly how the platform responds to
            real operational events.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={styles.panel} role="tabpanel">
          <div className={styles.panelLeft}>
            <span
              className={styles.badge}
              style={{ color: scenario.badgeColor, borderColor: `${scenario.badgeColor}44`, background: `${scenario.badgeColor}11` }}
            >
              {scenario.badge}
            </span>
            <h3 className={styles.panelTitle}>{scenario.title}</h3>
            <p className={styles.panelDesc}>{scenario.description}</p>
          </div>

          <div className={styles.panelRight}>
            {scenario.steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  {i < scenario.steps.length - 1 && (
                    <div className={styles.stepLine} />
                  )}
                </div>
                <div className={styles.stepContent}>
                  <p className={styles.stepLabel}>{step.label}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
