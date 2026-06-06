import { createFileRoute } from "@tanstack/react-router";
import { Server, Zap, Database, Snowflake, Network, ShieldCheck, ArrowRight } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/savings")({
  head: () => ({ meta: [{ title: "Savings Center — CloudGuardian AI" }] }),
  component: Savings,
});

const recs = [
  { icon: Server, t: "Remove Idle Servers", d: "14 EC2 instances under 5% utilization for 30+ days", s: 1200, e: "Easy", impact: "High" },
  { icon: Zap, t: "Use Spot Instances", d: "Migrate non-critical batch workloads to spot capacity", s: 1500, e: "Medium", impact: "High" },
  { icon: Database, t: "Reduce Database Size", d: "Right-size 3 overprovisioned RDS clusters (db.r6g.4xl → 2xl)", s: 1500, e: "Medium", impact: "High" },
  { icon: Snowflake, t: "Lifecycle S3 to Glacier", d: "2.4 TB of logs older than 90 days, accessed < 1x/month", s: 380, e: "Easy", impact: "Medium" },
  { icon: Network, t: "Optimize NAT Gateway", d: "Replace cross-AZ NAT traffic with VPC endpoints", s: 620, e: "Hard", impact: "Medium" },
  { icon: ShieldCheck, t: "Commit to Savings Plan", d: "1-year compute commit on baseline of 32 vCPU", s: 920, e: "Easy", impact: "High" },
];

function Savings() {
  const total = recs.reduce((a, b) => a + b.s, 0);
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Savings Center"
        title="Optimization Opportunities"
        subtitle="Actionable recommendations from your AI Cloud CFO. Approve in one click — we'll handle the change management."
        actions={<Button size="sm">Apply All Easy Wins</Button>}
      />

      <Card className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-success/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-success font-semibold">Total Potential Savings</div>
            <div className="text-5xl font-semibold mt-2 tabular-nums">${total.toLocaleString()}<span className="text-base text-muted-foreground font-normal"> / month</span></div>
            <div className="text-sm text-muted-foreground mt-1">${(total * 12).toLocaleString()} projected annual savings across {recs.length} recommendations</div>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            {[["Easy", 3], ["Medium", 2], ["Hard", 1]].map(([l, n]) => (
              <div key={l} className="rounded-xl border border-border bg-white/[0.02] p-3 text-center min-w-[88px]">
                <div className="text-2xl font-semibold">{n}</div>
                <div className="text-[11px] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div>
        <SectionTitle title="All Recommendations" hint="Ranked by monthly impact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recs.sort((a, b) => b.s - a.s).map((r) => {
            const I = r.icon;
            return (
              <Card key={r.t} className="group">
                <div className="flex items-start gap-4">
                  <div className="size-11 rounded-xl bg-success/10 text-success flex items-center justify-center ring-1 ring-success/20"><I className="size-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{r.t}</h4>
                      <span className={`pill ${r.e === "Easy" ? "text-success" : r.e === "Medium" ? "text-warning" : "text-danger"}`}>{r.e}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.d}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div>
                        <div className="text-lg font-semibold text-success tabular-nums">${r.s.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                      </div>
                      <Button size="sm" variant="outline">Review <ArrowRight className="size-3" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
