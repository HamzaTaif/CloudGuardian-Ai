import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Activity, CheckCircle2, Clock, Search } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle, StatusDot } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/incidents")({
  head: () => ({ meta: [{ title: "Incident Analyst — CloudGuardian AI" }] }),
  component: Incidents,
});

const incidents = [
  { id: "INC-2941", s: "critical", t: "Database Connection Failure", svc: "prod-rds-us-east", cause: "Expired Credentials", prog: 35, owner: "SK", time: "4m ago" },
  { id: "INC-2940", s: "critical", t: "Checkout API 5xx Spike", svc: "api-gateway / checkout-svc", cause: "Downstream timeout", prog: 60, owner: "MR", time: "18m ago" },
  { id: "INC-2939", s: "warning", t: "High CPU sustained", svc: "k8s-prod-cluster", cause: "Runaway cron job", prog: 75, owner: "AT", time: "42m ago" },
  { id: "INC-2938", s: "warning", t: "Memory pressure", svc: "redis-prod / cache-01", cause: "Cache hot key", prog: 50, owner: "JL", time: "1h ago" },
  { id: "INC-2937", s: "info", t: "Certificate expiring", svc: "edge-cdn.acme.com", cause: "Auto-renew disabled", prog: 10, owner: "SK", time: "3h ago" },
  { id: "INC-2936", s: "success", t: "Resolved: S3 latency", svc: "us-west-2", cause: "Provider issue", prog: 100, owner: "MR", time: "5h ago" },
];

function Incidents() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Incident Analyst"
        title="Active Incidents"
        subtitle="AI-powered triage that detects, diagnoses and explains incidents across your infrastructure in seconds."
        actions={<Link to="/root-cause"><Button size="sm">Run Root Cause</Button></Link>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertTriangle} label="Critical" value="2" tone="text-danger" bg="bg-danger/10" />
        <StatCard icon={Activity} label="Warning" value="3" tone="text-warning" bg="bg-warning/10" />
        <StatCard icon={Clock} label="MTTR (24h)" value="14m" tone="text-info" bg="bg-info/10" />
        <StatCard icon={CheckCircle2} label="Resolved today" value="12" tone="text-success" bg="bg-success/10" />
      </div>

      <Card padded={false}>
        <div className="p-5 pb-3 flex items-center justify-between">
          <SectionTitle title="Incident Queue" hint="Live triage" />
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input placeholder="Filter..." className="h-8 w-48 bg-white/[0.03] border border-border rounded-lg pl-8 pr-2 text-xs focus:outline-none focus:border-primary/40" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-y border-border">
              <th className="text-left font-medium py-2.5 pl-5">ID</th>
              <th className="text-left font-medium">Incident</th>
              <th className="text-left font-medium">Service</th>
              <th className="text-left font-medium">Root Cause</th>
              <th className="text-left font-medium">Progress</th>
              <th className="text-left font-medium">Owner</th>
              <th className="text-right font-medium pr-5">Time</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition cursor-pointer">
                <td className="py-3 pl-5 font-mono text-xs text-muted-foreground">{i.id}</td>
                <td>
                  <div className="flex items-center gap-2.5">
                    <StatusDot status={i.s as "critical"} />
                    <span className="font-medium">{i.t}</span>
                  </div>
                </td>
                <td className="text-xs text-muted-foreground">{i.svc}</td>
                <td className="text-xs">{i.cause}</td>
                <td className="w-40">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className={`h-full rounded-full ${i.prog === 100 ? "bg-success" : "grad-primary"}`} style={{ width: `${i.prog}%` }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground tabular-nums">{i.prog}%</span>
                  </div>
                </td>
                <td>
                  <div className="size-6 rounded-full grad-primary text-[10px] font-bold flex items-center justify-center">{i.owner}</div>
                </td>
                <td className="text-right pr-5 text-xs text-muted-foreground">{i.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone, bg }: { icon: typeof Activity; label: string; value: string; tone: string; bg: string }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className={`size-10 rounded-xl ${bg} ${tone} flex items-center justify-center`}><Icon className="size-5" /></div>
        <div>
          <div className="text-[11px] text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold tabular-nums">{value}</div>
        </div>
      </div>
    </Card>
  );
}
