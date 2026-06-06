import { createFileRoute } from "@tanstack/react-router";
import { Bot, Sparkles, TrendingUp, AlertTriangle, Lightbulb, Send, ArrowRight } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle, AreaChart } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/cfo")({
  head: () => ({ meta: [{ title: "AI Cloud CFO — CloudGuardian AI" }] }),
  component: CFO,
});

const forecast = [12.4,12.8,13.1,13.7,14.2,14.9,15.6,16.1,16.7,17.3,17.9,18.5];

function CFO() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="AI Cloud CFO"
        title="Financial Intelligence"
        subtitle="A dedicated AI agent that predicts your bill, explains spend drivers, and recommends actionable optimizations."
        actions={<Button size="sm"><Sparkles className="size-3.5" /> Generate Report</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute -top-32 -left-32 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex items-center gap-3 mb-6">
            <div className="size-12 rounded-2xl grad-primary flex items-center justify-center"><Bot className="size-6" /></div>
            <div>
              <div className="text-xs text-primary font-semibold uppercase tracking-[0.18em]">Forecast Insight</div>
              <h3 className="text-xl font-semibold">Your bill is trending +37% this month</h3>
            </div>
          </div>
          <p className="relative text-sm text-muted-foreground leading-relaxed max-w-3xl">
            A surge in EU traffic combined with a misconfigured RDS autoscale policy is the primary driver.
            Three targeted actions could recover <span className="text-success font-semibold">$4,200/month</span> without impacting performance.
          </p>
          <div className="relative h-56 mt-6"><AreaChart data={forecast} gradientId="cfoG" /></div>
        </Card>

        <Card>
          <SectionTitle title="Key Forecast" />
          <div className="space-y-4">
            <Metric label="Predicted Bill" value="$18,500" sub="EOM forecast" tone="text-white" icon={TrendingUp} />
            <Metric label="Cost Increase" value="+37%" sub="vs prior period" tone="text-warning" icon={AlertTriangle} />
            <Metric label="Primary Cause" value="Traffic Growth" sub="EU + US-East regions" tone="text-info" icon={Lightbulb} />
            <Metric label="Potential Savings" value="$4,200/mo" sub="3 recommended actions" tone="text-success" icon={Sparkles} />
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="AI Recommendations" hint="Ranked by impact" />
        <div className="space-y-3">
          {[
            { t: "Migrate batch jobs to spot instances", i: "Save $1,500/mo with 0% workload impact", x: "$1,500" },
            { t: "Right-size 3 RDS clusters", i: "Currently 18% avg utilization across the fleet", x: "$1,500" },
            { t: "Decommission 14 idle EC2 instances", i: "Below 5% CPU for 30+ days", x: "$1,200" },
          ].map((r, i) => (
            <div key={r.t} className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-white/[0.015] hover:border-primary/40 transition">
              <div className="size-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">{i+1}</div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.t}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.i}</div>
              </div>
              <span className="text-sm font-semibold text-success">{r.x}/mo</span>
              <Button size="sm" variant="outline">Apply <ArrowRight className="size-3" /></Button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Ask the CFO" hint="Natural-language queries over your cloud financials" />
        <div className="rounded-xl border border-border bg-bg-2/60 p-4">
          <div className="space-y-4 mb-4">
            <ChatBubble role="user">Why did our DB costs spike last week?</ChatBubble>
            <ChatBubble role="ai">
              prod-rds-us-east scaled from db.r6g.xlarge → 4xlarge on Tue 19:42 UTC after a connection burst from
              the checkout service. It hasn't scaled back. Recommend setting a max-instance ceiling and enabling
              connection pooling — projected savings $640/month.
            </ChatBubble>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3">
            <Sparkles className="size-4 text-primary" />
            <input placeholder="Ask anything about your cloud spend..." className="flex-1 h-11 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground" />
            <Button size="sm"><Send className="size-3.5" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value, sub, tone, icon: Icon }: { label: string; value: string; sub: string; tone: string; icon: typeof Bot }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white/[0.02]">
      <div className="size-9 rounded-lg bg-white/[0.04] flex items-center justify-center"><Icon className={`size-4 ${tone}`} /></div>
      <div className="flex-1">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className={`text-base font-semibold ${tone}`}>{value}</div>
      </div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function ChatBubble({ role, children }: { role: "user" | "ai"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary text-white text-sm px-4 py-2.5">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-start">
      <div className="size-8 rounded-lg grad-primary flex items-center justify-center shrink-0"><Bot className="size-4" /></div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/[0.04] text-sm px-4 py-2.5 text-foreground leading-relaxed">{children}</div>
    </div>
  );
}
