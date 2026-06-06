# CloudGuardian AI

> An AI-powered Cloud Operations Assistant that helps organizations reduce costs, respond to incidents faster, and stay informed — all from a single unified dashboard.

---

## What It Does

CloudGuardian AI replaces static dashboards with an intelligent advisor that actively works for your team:

- **Reduce Cloud Costs** — Automatically identifies idle resources, orphaned infrastructure, and over-provisioned services
- **Explain Cost Increases** — Breaks down spending spikes so engineering and finance teams know exactly where budget is going
- **Analyze Incidents** — Parses infrastructure logs automatically to detect errors the moment they happen
- **Identify Root Causes** — Isolates the core problem behind every operational failure
- **Recommend Recovery Actions** — Provides step-by-step remediation guidance to get teams back online fast
- **Notify Teams** — Pushes structured alerts across Email, Slack, and Microsoft Teams simultaneously

---

## Architecture

The platform is built around four interconnected modules feeding into a unified reporting interface:

```
┌─────────────────────┐    ┌────────────────────────┐
│   AI Cloud CFO      │    │  AI Incident Analyst   │
│  Cost Prediction    │    │  Log Analysis          │
│  Cost Explanation   │    │  Root Cause Detection  │
│  Savings Recs       │    │  Severity Assessment   │
│  Resource Opt.      │    │  Recovery Recs         │
└────────┬────────────┘    └──────────┬─────────────┘
         │                            │
         └──────────┬─────────────────┘
                    ▼
         ┌──────────────────────┐
         │   Unified Dashboard  │
         │  Cost | Incidents    │
         │  Reports | Alerts    │
         └──────────┬───────────┘
                    │
         ┌──────────▼───────────┐
         │  Notification Center │
         │  Email | Slack | Teams│
         └──────────────────────┘
```

### Module Summary

| Module | Purpose |
|---|---|
| **AI Cloud CFO** | Automated cloud financial advisor — predicts bills, explains increases, recommends savings |
| **AI Incident Analyst** | Automated cloud engineer — parses logs, detects root causes, classifies severity, recommends fixes |
| **Notification Center** | Structured alert delivery via Email, Slack, and Microsoft Teams webhooks |
| **Unified Dashboard** | Visual interface aggregating cost, incident, and performance data |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React / Next.js |
| Backend | Node.js |
| Database | MongoDB |
| AI / LLM | Claude / OpenAI / AWS Bedrock |
| Notifications | SMTP Email + Slack & MS Teams Webhooks |
| Infrastructure | Amazon Web Services (AWS) |

---

## Demo Scenarios

### Scenario 1: Infrastructure Traffic Spike
A 500% surge in concurrent users triggers the AI Cloud CFO to:
- Forecast a predicted monthly bill of **$18,500**
- Recommend migrating worker nodes to Spot Instances and downsizing over-provisioned databases
- Calculate potential savings of **$4,200/month**

### Scenario 2: Critical Database Failure
A standard log exception (`ERROR: Database Connection Failed`) triggers the AI Incident Analyst to:
- Detect root cause: **Expired Database Credentials**
- Classify severity as **Critical / Priority: High**
- Generate step-by-step recovery: Rotate credentials → Restart database service
- Dispatch notifications to all configured channels

---

## Project Structure

```
cloudguardian-ai/
├── frontend/          # Next.js dashboard application
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   └── public/        # Static assets
├── backend/           # Node.js API server
│   ├── modules/
│   │   ├── cfo/       # AI Cloud CFO module
│   │   ├── incident/  # AI Incident Analyst module
│   │   └── notify/    # Notification Center module
│   └── db/            # MongoDB models and connections
└── docs/              # Architecture diagrams and documentation
```

---

## Team

**13-member team across 5 functional groups:**

| Team | Scope |
|---|---|
| **Team 1 — Frontend Dashboard** | Home Page, Cost Dashboard, Incident Dashboard, Reports Dashboard, UI/UX |
| **Team 2 — AI Cloud CFO** | Cost prediction algorithms, LLM pipelines, recommendation engines, savings calculators |
| **Team 3 — AI Incident Analyst** | Log analysis pipelines, root cause prompts, severity classifiers, recovery workflows |
| **Team 4 — Notification Center** | Email/Slack/Teams templates, webhook delivery, notification control UI |
| **Team 5 — Docs & Presentation** | README, architecture diagrams, presentation deck, live demo scripts |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/cloudguardian-ai.git
cd cloudguardian-ai

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Configure environment variables
cp .env.example .env
# Add your API keys: OpenAI/Bedrock, MongoDB URI, SMTP, Slack webhook, Teams webhook

# Run development servers
npm run dev        # frontend on http://localhost:3000
npm run dev:api    # backend on http://localhost:4000
```

---

*Built for the Ship With Kiro Hackathon*
