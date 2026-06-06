import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import "../landing.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CloudGuardian AI — Intelligent Cloud Operations" },
      { name: "description", content: "AI-powered Cloud Operations Platform — Cost forecasting, incident analysis, and intelligent recommendations." }
    ]
  }),
  component: LandingPage,
});

function LandingPage() {
  const [activeTab, setActiveTab] = useState<"traffic" | "db">("traffic");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-body">
      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav id="landing-navbar" style={{ background: scrolled ? "rgba(10,15,30,0.97)" : "rgba(10,15,30,0.88)" }}>
        <div className="landing-nav-inner">
          <a href="#" className="landing-nav-logo">
            <span className="landing-nav-logo-icon">⛨</span>
            <span>Cloud<span className="landing-logo-accent">Guardian</span> AI</span>
          </a>
          <ul className="landing-nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#modules">Modules</a></li>
            <li><a href="#demo">Demo</a></li>
            <li><a href="#stack">Stack</a></li>
          </ul>
          <div className="landing-nav-actions">
            <a href="#demo" className="landing-btn-outline">See Demo</a>
            <Link to="/dashboard" className="landing-btn-primary">Launch Console</Link>
          </div>
          <button 
            className="landing-hamburger" 
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            aria-label="Toggle menu" 
            aria-expanded={hamburgerOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`landing-mobile-menu ${hamburgerOpen ? "open" : ""}`} role="navigation" aria-label="Mobile navigation">
          <a href="#features" className="mobile-link" onClick={() => setHamburgerOpen(false)}>Features</a>
          <a href="#modules" className="mobile-link" onClick={() => setHamburgerOpen(false)}>Modules</a>
          <a href="#demo" className="mobile-link" onClick={() => setHamburgerOpen(false)}>Demo</a>
          <a href="#stack" className="mobile-link" onClick={() => setHamburgerOpen(false)}>Stack</a>
          <Link to="/dashboard" className="landing-btn-primary" onClick={() => setHamburgerOpen(false)}>Launch Console</Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section id="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-badge">
            <span className="landing-pulse-dot"></span>
            AI-Powered Cloud Operations Platform
          </div>

          <h1 className="landing-hero-title">
            Your Cloud Infrastructure,<br />
            <span className="gradient">Intelligently Managed</span>
          </h1>

          <p className="landing-hero-sub">
            CloudGuardian AI combines an AI Cloud CFO and AI Incident Analyst —
            transforming raw cloud data into cost savings, instant root causes, and
            proactive recommendations.
          </p>

          <div className="landing-hero-ctas">
            <Link to="/dashboard" className="landing-btn-primary">Launch Dashboard →</Link>
            <a href="#demo" className="landing-btn-outline">View Live Demo</a>
            <a href="#modules" className="landing-btn-outline">Explore Modules</a>
          </div>

          {/* Terminal */}
          <div className="landing-terminal">
            <div className="landing-terminal-bar">
              <div className="landing-t-dot" style={{ background: "#ef4444" }}></div>
              <div className="landing-t-dot" style={{ background: "#f59e0b" }}></div>
              <div className="landing-t-dot" style={{ background: "#10b981" }}></div>
              <span className="landing-t-title">cloudguardian — ai-analyst</span>
            </div>
            <div className="landing-terminal-body">
              <div className="landing-t-line"><span className="landing-t-icon landing-t-green">✓</span><span>Log stream connected — 1,247 events parsed</span></div>
              <div className="landing-t-line"><span className="landing-t-icon landing-t-red">✗</span><span>ERROR: Database Connection Failed detected</span></div>
              <div className="landing-t-line"><span className="landing-t-icon landing-t-yellow">→</span><span>Root Cause: <span className="landing-t-white">Expired Database Credentials</span></span></div>
              <div className="landing-t-line"><span className="landing-t-icon landing-t-yellow">→</span><span>Severity: <span className="landing-t-red">Critical</span> / Priority: <span className="landing-t-red">High</span></span></div>
              <div className="landing-t-line"><span className="landing-t-icon landing-t-blue">⚡</span><span>Recovery: Rotate credentials → Restart db service</span></div>
              <div className="landing-t-line"><span className="landing-t-icon landing-t-green">✓</span><span>Notifications dispatched — Email, Slack, Teams</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section id="landing-stats">
        <div className="landing-container">
          <div className="landing-stats-grid">
            <div><div className="landing-stat-val" style={{ color: "#10b981" }}>$4,200</div><div className="landing-stat-label">Monthly savings identified</div></div>
            <div><div className="landing-stat-val" style={{ color: "#3b82f6" }}>&lt;2 min</div><div className="landing-stat-label">Avg. incident detection time</div></div>
            <div><div className="landing-stat-val" style={{ color: "#8b5cf6" }}>3</div><div className="landing-stat-label">Notification channels</div></div>
            <div><div className="landing-stat-val" style={{ color: "#f59e0b" }}>4</div><div className="landing-stat-label">AI-powered modules</div></div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section id="features" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header">
            <p className="landing-eyebrow" style={{ color: "#3b82f6" }}>Capabilities</p>
            <h2 className="landing-section-title">Everything your cloud team needs</h2>
            <p className="landing-section-sub">Six core capabilities working together to give you full operational visibility and control.</p>
          </div>
          <div className="landing-grid-3">
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)" }}>💰</div>
              <div className="landing-card-title">Cost Prediction</div>
              <div className="landing-card-desc">Forecast next month's bill before the invoice arrives. Catch spending anomalies early with AI-driven usage trend analysis.</div>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.22)" }}>📊</div>
              <div className="landing-card-title">Cost Explanation</div>
              <div className="landing-card-desc">Plain-language breakdowns — "Costs increased 37% due to traffic surges and additional compute scaling."</div>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.22)" }}>💡</div>
              <div className="landing-card-title">Savings Recommendations</div>
              <div className="landing-card-desc">Actionable tasks — remove idle servers, use spot instances, right-size databases — with exact savings estimates.</div>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.22)" }}>🔍</div>
              <div className="landing-card-title">Log Analysis</div>
              <div className="landing-card-desc">Feed in raw unstructured logs. The AI parses thousands of events per second and flags critical errors instantly.</div>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.22)" }}>🎯</div>
              <div className="landing-card-title">Root Cause Detection</div>
              <div className="landing-card-desc">No more guessing. CloudGuardian pinpoints exactly why something failed — from expired credentials to misconfigured routes.</div>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon" style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.22)" }}>🔔</div>
              <div className="landing-card-title">Multi-Channel Alerts</div>
              <div className="landing-card-desc">Structured alerts delivered simultaneously to Email, Slack, and Microsoft Teams — rich templates, zero setup friction.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO ─────────────────────────────────────────────────── */}
      <section id="demo" className="landing-section landing-section-alt">
        <div className="landing-container">
          <div className="landing-section-header">
            <p className="landing-eyebrow" style={{ color: "#06b6d4" }}>Live Demo</p>
            <h2 className="landing-section-title">See CloudGuardian AI in action</h2>
            <p className="landing-section-sub">Two reference scenarios showing exactly how the platform responds to real operational events.</p>
          </div>

          <div className="landing-tabs" role="tablist">
            <button 
              className={`landing-tab ${activeTab === "traffic" ? "active" : ""}`} 
              role="tab" 
              aria-selected={activeTab === "traffic"}  
              onClick={() => setActiveTab("traffic")}
            >
              Traffic Spike
            </button>
            <button 
              className={`landing-tab ${activeTab === "db" ? "active" : ""}`} 
              role="tab" 
              aria-selected={activeTab === "db"} 
              onClick={() => setActiveTab("db")}
            >
              Database Failure
            </button>
          </div>

          {/* Traffic Spike panel */}
          <div className={`landing-demo-panel ${activeTab === "traffic" ? "active" : ""}`} role="tabpanel">
            <div>
              <div className="landing-demo-badge" style={{ color: "#10b981", borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.08)" }}>Cost Event</div>
              <div className="landing-demo-title">Infrastructure Traffic Spike</div>
              <div className="landing-demo-desc">Concurrent user traffic spikes by 500%, triggering rapid compute scaling and database expansion.</div>
            </div>
            <div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">📈</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Detection</div><div className="landing-step-detail">AI Cloud CFO detects 500% traffic growth and abnormal resource provisioning</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">💸</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Forecast</div><div className="landing-step-detail">Predicted Monthly Bill: $18,500 — up from baseline $13,600</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">💡</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Recommendations</div><div className="landing-step-detail">Migrate worker nodes to Spot Instances · Downsize over-provisioned databases</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">✅</div></div>
                <div className="landing-step-content"><div className="landing-step-label">Savings</div><div className="landing-step-detail">Potential savings identified: $4,200/month</div></div>
              </div>
            </div>
          </div>

          {/* Database Failure panel */}
          <div className={`landing-demo-panel ${activeTab === "db" ? "active" : ""}`} role="tabpanel">
            <div>
              <div className="landing-demo-badge" style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)" }}>Critical Incident</div>
              <div className="landing-demo-title">Critical Database Connection Failure</div>
              <div className="landing-demo-desc">A standard database log exception triggers the full AI Incident Analyst pipeline.</div>
            </div>
            <div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">🔍</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Log Parsed</div><div className="landing-step-detail">ERROR: Database Connection Failed — detected in 1,247 log events</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">🎯</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Root Cause</div><div className="landing-step-detail">Root Cause: Expired Database Credentials</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">⚠️</div><div className="landing-step-line"></div></div>
                <div className="landing-step-content"><div className="landing-step-label">Severity</div><div className="landing-step-detail">Severity: Critical / Priority: High — immediate action required</div></div>
              </div>
              <div className="landing-step">
                <div className="landing-step-icon-col"><div className="landing-step-icon">🔔</div></div>
                <div className="landing-step-content"><div className="landing-step-label">Notified</div><div className="landing-step-detail">Recovery plan dispatched → Email, Slack, Microsoft Teams</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULES ─────────────────────────────────────────────────── */}
      <section id="modules" class="landing-section">
        <div className="landing-container">
          <div className="landing-section-header">
            <p className="landing-eyebrow" style={{ color: "#8b5cf6" }}>Architecture</p>
            <h2 className="landing-section-title">Four modules, one platform</h2>
            <p className="landing-section-sub">Each module is independently focused but fully integrated — data flows between them automatically.</p>
          </div>
          <div className="landing-grid-2">

            <div className="landing-card">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                <span className="landing-module-num" style={{ color: "#10b981" }}>01</span>
                <div className="landing-module-line" style={{ background: "linear-gradient(90deg,#10b981,transparent)" }}></div>
              </div>
              <div className="landing-module-title" style={{ color: "#10b981" }}>AI Cloud CFO</div>
              <div className="landing-module-desc">Automated cloud financial advisor. Monitors usage, forecasts bills, explains budget drivers, and finds savings opportunities.</div>
              <ul className="landing-cap-list">
                <li><span className="landing-cap-dot" style={{ background: "#10b981" }}></span>Cost Prediction</li>
                <li><span className="landing-cap-dot" style={{ background: "#10b981" }}></span>Cost Explanation</li>
                <li><span className="landing-cap-dot" style={{ background: "#10b981" }}></span>Savings Recommendations</li>
                <li><span className="landing-cap-dot" style={{ background: "#10b981" }}></span>Resource Optimization</li>
              </ul>
            </div>

            <div className="landing-card">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                <span className="landing-module-num" style={{ color: "#3b82f6" }}>02</span>
                <div className="landing-module-line" style={{ background: "linear-gradient(90deg,#3b82f6,transparent)" }}></div>
              </div>
              <div className="landing-module-title" style={{ color: "#3b82f6" }}>AI Incident Analyst</div>
              <div className="landing-module-desc">Automated cloud engineer. Parses log streams, identifies root causes, classifies severity, and generates step-by-step recovery plans.</div>
              <ul className="landing-cap-list">
                <li><span className="landing-cap-dot" style={{ background: "#3b82f6" }}></span>Log Analysis</li>
                <li><span className="landing-cap-dot" style={{ background: "#3b82f6" }}></span>Root Cause Detection</li>
                <li><span className="landing-cap-dot" style={{ background: "#3b82f6" }}></span>Severity Assessment</li>
                <li><span className="landing-cap-dot" style={{ background: "#3b82f6" }}></span>Recovery Recommendations</li>
              </ul>
            </div>

            <div className="landing-card">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                <span className="landing-module-num" style={{ color: "#8b5cf6" }}>03</span>
                <div className="landing-module-line" style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }}></div>
              </div>
              <div className="landing-module-title" style={{ color: "#8b5cf6" }}>Notification Center</div>
              <div className="landing-module-desc">Keeps every stakeholder informed. Rich, structured templates delivered via Email, Slack webhooks, and Microsoft Teams cards.</div>
              <ul className="landing-cap-list">
                <li><span className="landing-cap-dot" style={{ background: "#8b5cf6" }}></span>Email Notifications</li>
                <li><span className="landing-cap-dot" style={{ background: "#8b5cf6" }}></span>Slack Alerts</li>
                <li><span className="landing-cap-dot" style={{ background: "#8b5cf6" }}></span>MS Teams Cards</li>
                <li><span className="landing-cap-dot" style={{ background: "#8b5cf6" }}></span>Custom Templates</li>
              </ul>
            </div>

            <div className="landing-card">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                <span className="landing-module-num" style={{ color: "#f59e0b" }}>04</span>
                <div className="landing-module-line" style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }}></div>
              </div>
              <div className="landing-module-title" style={{ color: "#f59e0b" }}>Unified Dashboard</div>
              <div className="landing-module-desc">Single pane of glass for your cloud operations. Cost trends, active incidents, recovery timelines, and optimization history.</div>
              <ul className="landing-cap-list">
                <li><span className="landing-cap-dot" style={{ background: "#f59e0b" }}></span>Cost Dashboard</li>
                <li><span className="landing-cap-dot" style={{ background: "#f59e0b" }}></span>Incident Dashboard</li>
                <li><span className="landing-cap-dot" style={{ background: "#f59e0b" }}></span>Reports Dashboard</li>
                <li><span className="landing-cap-dot" style={{ background: "#f59e0b" }}></span>Real-time Updates</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────────────── */}
      <section className="landing-section landing-section-alt">
        <div className="landing-container">
          <div className="landing-section-header">
            <p className="landing-eyebrow" style={{ color: "#06b6d4" }}>How It Works</p>
            <h2 className="landing-section-title">The AI Workflow</h2>
            <p className="landing-section-sub">From raw cloud data to actionable insights in seconds.</p>
          </div>
          <div className="landing-workflow">
            <div className="landing-wf-step">☁️ Cloud Metrics / Logs</div>
            <div className="landing-wf-arrow">↓</div>
            <div className="landing-wf-step" style={{ borderColor: "#3b82f6", color: "#60a5fa" }}>⛨ CloudGuardian AI</div>
            <div className="landing-wf-arrow">↓</div>
            <div className="landing-wf-step">🔬 Analysis Engine</div>
            <div className="landing-wf-arrow">↓</div>
            <div className="landing-wf-step">💡 Recommendations</div>
            <div className="landing-wf-arrow">↓</div>
            <div className="landing-wf-step">📄 Reports</div>
            <div className="landing-wf-arrow">↓</div>
            <div className="landing-wf-step">🔔 Notifications</div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────────────────────────── */}
      <section id="stack" className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header">
            <p className="landing-eyebrow" style={{ color: "#f59e0b" }}>Technology</p>
            <h2 className="landing-section-title">Built on a proven stack</h2>
          </div>
          <div className="landing-grid-3">
            <div className="landing-tech-card"><span className="landing-tech-emoji">⚛️</span><div><div className="landing-tech-layer">Frontend</div><div className="landing-tech-name" style={{ color: "#06b6d4" }}>React / TanStack</div></div></div>
            <div className="landing-tech-card"><span className="landing-tech-emoji">🟢</span><div><div className="landing-tech-layer">Backend</div><div className="landing-tech-name" style={{ color: "#10b981" }}>Node.js</div></div></div>
            <div className="landing-tech-card"><span className="landing-tech-emoji">🍃</span><div><div className="landing-tech-layer">Database</div><div className="landing-tech-name" style={{ color: "#10b981" }}>MongoDB</div></div></div>
            <div className="landing-tech-card"><span className="landing-tech-emoji">🤖</span><div><div className="landing-tech-layer">AI / LLM</div><div className="landing-tech-name" style={{ color: "#8b5cf6" }}>Claude · OpenAI · Bedrock</div></div></div>
            <div className="landing-tech-card"><span className="landing-tech-emoji">🔔</span><div><div className="landing-tech-layer">Notifications</div><div className="landing-tech-name" style={{ color: "#f59e0b" }}>SMTP · Slack · MS Teams</div></div></div>
            <div className="landing-tech-card"><span className="landing-tech-emoji">☁️</span><div><div className="landing-tech-layer">Infrastructure</div><div className="landing-tech-name" style={{ color: "#f59e0b" }}>Amazon Web Services</div></div></div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section id="landing-cta">
        <div style={{ position: "relative" }}>
          <h2 className="landing-cta-title">Ready to put your cloud on autopilot?</h2>
          <p className="landing-cta-sub">Get full visibility into costs and incidents from day one. No configuration overhead — connect and let the AI work.</p>
          <div className="landing-cta-btns">
            <Link to="/dashboard" className="landing-btn-primary">Launch Dashboard →</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="landing-btn-outline">View on GitHub</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer id="landing-footer">
        <div className="landing-footer-inner">
          <a href="#" className="landing-nav-logo">
            <span className="landing-nav-logo-icon">⛨</span>
            <span>Cloud<span className="landing-logo-accent">Guardian</span> AI</span>
          </a>
          <nav className="landing-footer-links">
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            <a href="#demo">Demo</a>
            <a href="#stack">Stack</a>
          </nav>
          <span className="landing-footer-copy">Built for the Ship With Kiro Hackathon</span>
        </div>
      </footer>
    </div>
  );
}
