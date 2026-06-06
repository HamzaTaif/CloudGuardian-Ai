import { createFileRoute } from "@tanstack/react-router";
import { Mail, Slack, MessageSquare, Check } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — CloudGuardian AI" }] }),
  component: Notifications,
});

function Notifications() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Notification Center"
        title="Delivery & Previews"
        subtitle="Configure how CloudGuardian surfaces incidents and cost anomalies across your team's channels."
        actions={<Button size="sm">Send Test Alert</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChannelPreview brand="Email" icon={<Mail className="size-4" />} accent="bg-info/15 text-info">
          <div className="p-4 bg-white text-slate-900 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>alerts@cloudguardian.ai</span><span>09:42</span>
            </div>
            <div className="text-sm font-semibold">[Critical] DB Connection Failure</div>
            <p className="text-xs text-slate-600 leading-relaxed">prod-rds-us-east is rejecting connections. Root cause: expired credentials. Confidence 96%.</p>
            <button className="text-xs font-medium text-indigo-600">View incident →</button>
          </div>
        </ChannelPreview>

        <ChannelPreview brand="Slack" icon={<Slack className="size-4" />} accent="bg-warning/15 text-warning">
          <div className="p-3 bg-[#1A1D21] rounded-lg space-y-2 border border-white/5">
            <div className="flex items-center gap-2 text-xs">
              <div className="size-6 rounded grad-primary flex items-center justify-center text-[10px] font-bold">CG</div>
              <span className="font-semibold text-white">CloudGuardian</span>
              <span className="text-slate-500">APP · 09:42</span>
            </div>
            <div className="border-l-2 border-danger pl-3">
              <div className="text-sm font-semibold text-white">🚨 Critical incident detected</div>
              <p className="text-xs text-slate-300 mt-1">DB Connection Failure on prod-rds-us-east. AI confidence 96% — expired credentials.</p>
              <div className="flex gap-2 mt-2"><button className="text-[11px] bg-white/10 hover:bg-white/15 text-white px-2 py-1 rounded">Acknowledge</button><button className="text-[11px] bg-white/10 hover:bg-white/15 text-white px-2 py-1 rounded">Open RCA</button></div>
            </div>
          </div>
        </ChannelPreview>

        <ChannelPreview brand="Microsoft Teams" icon={<MessageSquare className="size-4" />} accent="bg-primary/15 text-primary">
          <div className="p-3 bg-[#F5F5F5] rounded-lg space-y-2 text-slate-900">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded grad-primary flex items-center justify-center text-[10px] font-bold text-white">CG</div>
              <span className="text-xs font-semibold">CloudGuardian Bot</span>
            </div>
            <div className="text-sm font-semibold">Cost anomaly detected</div>
            <p className="text-xs text-slate-600">Forecasted monthly bill +37% — primary driver: traffic growth. $4,200/mo savings identified.</p>
            <button className="text-xs font-medium px-2 py-1 rounded bg-indigo-600 text-white">Open CFO Report</button>
          </div>
        </ChannelPreview>
      </div>

      <Card padded={false}>
        <div className="p-5 pb-3"><SectionTitle title="Recent Notifications" /></div>
        <ul className="divide-y divide-border">
          {[
            ["critical", "Database Connection Failure", "prod-rds-us-east", "Slack, Email", "4m ago"],
            ["warning", "Cost forecast +37% this month", "Org-wide", "Teams, Email", "1h ago"],
            ["info", "Weekly executive report ready", "Acme Corp", "Email", "3h ago"],
            ["success", "Resolved: S3 latency", "us-west-2", "Slack", "5h ago"],
          ].map(([s, t, ctx, ch, time]) => (
            <li key={t} className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition">
              <span className={`size-2 rounded-full ${s === "critical" ? "bg-danger" : s === "warning" ? "bg-warning" : s === "info" ? "bg-info" : "bg-success"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{ctx}</div>
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">Delivered via <span className="text-white">{ch}</span></div>
              <span className="text-xs text-muted-foreground w-16 text-right">{time}</span>
              <button className="size-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-white"><Check className="size-3.5" /></button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function ChannelPreview({ brand, icon, accent, children }: { brand: string; icon: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`size-8 rounded-lg ${accent} flex items-center justify-center`}>{icon}</div>
          <div>
            <div className="text-sm font-semibold">{brand}</div>
            <div className="text-[11px] text-muted-foreground">Live preview</div>
          </div>
        </div>
        <span className="pill text-success border-success/30 bg-success/10">Connected</span>
      </div>
      {children}
    </Card>
  );
}
