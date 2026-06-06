import { createFileRoute } from "@tanstack/react-router";
import { Bot, Sparkles, KeyRound, RefreshCw, ShieldCheck, AlertTriangle, Eye, Search, BrainCircuit, ListChecks, CheckCircle2 } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/root-cause")({
  head: () => ({ meta: [{ title: "Root Cause Analysis — CloudGuardian AI" }] }),
  component: RootCause,
});

function RootCause() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Root Cause Analysis"
        title="AI Investigation"
        subtitle="Watch the AI engineer trace logs, metrics, and configuration history to pinpoint root cause in seconds."
        actions={<Button size="sm"><Sparkles className="size-3.5" /> Re-run Analysis</Button>}
      />

      <Card className="relative overflow-hidden">
        <div className="absolute -top-32 -right-20 size-80 rounded-full bg-danger/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-danger/15 text-danger flex items-center justify-center ring-1 ring-danger/30"><AlertTriangle className="size-6" /></div>
            <div>
              <div className="text-[11px] text-danger font-semibold uppercase tracking-[0.18em]">Critical · INC-2941</div>
              <h3 className="text-2xl font-semibold mt-1">Database Connection Failure</h3>
              <p className="text-sm text-muted-foreground mt-1">prod-rds-us-east · started 4 minutes ago</p>
            </div>
          </div>
          <ConfidenceRing value={96} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Stat label="Root Cause" value="Expired Credentials" tone="text-danger" />
          <Stat label="Affected Services" value="3 services" tone="text-warning" />
          <Stat label="Estimated Resolution" value="≈ 6 min" tone="text-success" />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-bg-2/60 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-7 rounded-lg grad-primary flex items-center justify-center"><Bot className="size-4" /></div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">AI Reasoning</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">
            The RDS instance <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.05]">prod-rds-us-east</span> began
            rejecting connections at <span className="text-warning">19:42:14 UTC</span>. Auth logs show 1,284 failed attempts using IAM token
            <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.05]"> svc-checkout-prod</span>, which rotated on Apr 12.
            The rotation policy expired the secret without updating dependent services. Restoring credentials and
            triggering connection-pool refresh should fully resolve.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Recommended Actions" hint="One-click remediation" />
          <div className="space-y-2.5">
            {[
              { i: KeyRound, t: "Rotate Credentials", d: "Generate new IAM token for svc-checkout-prod" },
              { i: RefreshCw, t: "Restart Database Service", d: "Rolling restart with zero downtime" },
              { i: ShieldCheck, t: "Verify Access Policies", d: "Audit IAM policy attached to checkout service" },
            ].map((a, idx) => {
              const I = a.i;
              return (
                <div key={a.t} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-white/[0.015] hover:border-primary/40 transition">
                  <div className="size-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">{idx+1}</div>
                  <I className="size-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.d}</div>
                  </div>
                  <Button size="sm" variant="outline">Run</Button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Investigation Timeline" />
          <ol className="relative ml-3 border-l border-border space-y-5 mt-1">
            {[
              { i: Eye, t: "Detection", at: "19:42:14", desc: "5xx error rate exceeded threshold (>2%)", done: true },
              { i: Search, t: "Signal Analysis", at: "19:42:21", desc: "Correlated 12 signals across 4 services", done: true },
              { i: BrainCircuit, t: "Root Cause Discovery", at: "19:42:33", desc: "Identified expired IAM token", done: true, ai: true },
              { i: ListChecks, t: "Recommendation Generation", at: "19:42:41", desc: "3 actions, ranked by safety", done: true, ai: true },
              { i: CheckCircle2, t: "Resolution", at: "—", desc: "Awaiting operator approval", done: false },
            ].map((s) => {
              const I = s.i;
              return (
                <li key={s.t} className="pl-6 relative">
                  <span className={`absolute -left-[11px] top-0.5 size-5 rounded-full flex items-center justify-center ring-4 ring-bg ${s.done ? "grad-primary" : "bg-white/[0.06]"}`}>
                    <I className="size-3 text-white" />
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-sm font-medium flex items-center gap-2">
                      {s.t}
                      {s.ai && <span className="pill text-primary border-primary/30 bg-primary/10">AI</span>}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">{s.at}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/[0.02] p-4">
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className={`text-xl font-semibold mt-1 ${tone}`}>{value}</div>
    </div>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const r = 30, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="40" cy="40" r={r} fill="none" stroke="url(#cgrad)" strokeWidth="8" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 40 40)" />
        <defs><linearGradient id="cgrad" x1="0" x2="1"><stop offset="0%" stopColor="#4F46E5" /><stop offset="100%" stopColor="#22C55E" /></linearGradient></defs>
        <text x="40" y="45" textAnchor="middle" className="fill-white" style={{ fontSize: 16, fontWeight: 700 }}>{value}%</text>
      </svg>
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">AI Confidence</div>
        <div className="text-sm font-medium">High certainty</div>
      </div>
    </div>
  );
}
