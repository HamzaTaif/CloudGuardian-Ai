import { createFileRoute } from "@tanstack/react-router";
import { FileText, DollarSign, AlertTriangle, Sparkles, Download } from "lucide-react";
import { AreaChart, BarsChart, Button, Card, PageHeader, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — CloudGuardian AI" }] }),
  component: Reports,
});

const cats = [
  { i: DollarSign, t: "Cost Reports", d: "Monthly spend, anomalies, forecasts", n: 12, c: "text-primary", bg: "bg-primary/10" },
  { i: AlertTriangle, t: "Incident Reports", d: "MTTR, RCAs, postmortems", n: 8, c: "text-danger", bg: "bg-danger/10" },
  { i: Sparkles, t: "Optimization Reports", d: "Applied savings & impact", n: 6, c: "text-success", bg: "bg-success/10" },
  { i: FileText, t: "Executive Reports", d: "Board-ready summaries", n: 4, c: "text-info", bg: "bg-info/10" },
];

function Reports() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reports"
        title="Reporting Dashboard"
        subtitle="Generate, schedule, and share enterprise-grade reports across cost, incidents, and optimizations."
        actions={<Button size="sm"><Download className="size-3.5" /> New Report</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cats.map((c) => {
          const I = c.i;
          return (
            <Card key={c.t} className="group cursor-pointer">
              <div className={`size-11 rounded-xl ${c.bg} ${c.c} flex items-center justify-center mb-4`}><I className="size-5" /></div>
              <div className="text-sm font-semibold">{c.t}</div>
              <p className="text-xs text-muted-foreground mt-1">{c.d}</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{c.n} reports</span>
                <span className={c.c}>Open →</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Monthly Executive Summary" hint="Period: Last 30 days" action={<Button size="sm" variant="outline"><Download className="size-3.5" /> Export PDF</Button>} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              ["Total Spend", "$12,450", "+8.4%"],
              ["Incidents", "47", "-22%"],
              ["MTTR", "14m", "-31%"],
              ["Savings Realized", "$3,180", "+44%"],
            ].map(([l, v, d]) => (
              <div key={l} className="rounded-xl border border-border bg-white/[0.02] p-3">
                <div className="text-[11px] text-muted-foreground">{l}</div>
                <div className="text-lg font-semibold mt-1">{v}</div>
                <div className={`text-[11px] ${d.startsWith("-") ? "text-success" : "text-warning"}`}>{d}</div>
              </div>
            ))}
          </div>
          <div className="h-48"><AreaChart data={[8,9,10,12,11,13,15,14,16,18,17,19,21,20,22,24,23,26,25,27,29,28,31,33]} gradientId="repG" /></div>
        </Card>

        <Card>
          <SectionTitle title="Scheduled Reports" />
          <ul className="space-y-3">
            {[
              ["Weekly Cost Digest", "Every Monday · 09:00"],
              ["Monthly Executive Brief", "1st of month · 08:00"],
              ["Incident Postmortem", "On-demand"],
              ["Q3 Optimization Review", "Sept 30 · 17:00"],
            ].map(([t, s]) => (
              <li key={t} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white/[0.015]">
                <div className="size-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><FileText className="size-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-[11px] text-muted-foreground">{s}</div>
                </div>
                <span className="pill text-success border-success/30 bg-success/10">Active</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Cost vs Incidents" hint="Correlation analysis" />
        <div className="h-56"><BarsChart data={[3,4,2,5,7,6,8,5,9,11,10,12]} color="#8B5CF6" /></div>
      </Card>
    </div>
  );
}
