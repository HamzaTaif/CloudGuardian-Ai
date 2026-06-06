import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Building2, Shield, Code2, Palette } from "lucide-react";
import { Button, Card, PageHeader, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — CloudGuardian AI" }] }),
  component: Settings,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "org", label: "Organization", icon: Building2 },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API", icon: Code2 },
  { id: "theme", label: "Theme", icon: Palette },
];

function Settings() {
  const [active, setActive] = useState("profile");
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Settings" title="Workspace Settings" subtitle="Manage your profile, organization, security, and platform integrations." />

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <Card padded={false} className="self-start">
          <nav className="p-2">
            {tabs.map((t) => {
              const I = t.icon;
              const isActive = active === t.id;
              return (
                <button key={t.id} onClick={() => setActive(t.id)} className={`w-full flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg transition ${isActive ? "bg-primary-soft text-white" : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"}`}>
                  <I className="size-4" /> {t.label}
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="space-y-4">
          {active === "profile" && (
            <Card>
              <SectionTitle title="Profile" hint="How others see you" />
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="size-16 rounded-2xl grad-primary flex items-center justify-center text-xl font-bold">SK</div>
                <div className="flex-1">
                  <div className="text-base font-semibold">Sasha Kim</div>
                  <div className="text-xs text-muted-foreground">Platform Administrator · Acme Corp</div>
                </div>
                <Button variant="outline" size="sm">Change avatar</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full name" defaultValue="Sasha Kim" />
                <Field label="Email" defaultValue="sasha@acme.com" />
                <Field label="Role" defaultValue="Platform Administrator" />
                <Field label="Timezone" defaultValue="UTC-08:00 Pacific" />
              </div>
              <div className="flex justify-end gap-2 mt-6"><Button variant="ghost" size="sm">Cancel</Button><Button size="sm">Save changes</Button></div>
            </Card>
          )}

          {active === "notifications" && (
            <Card>
              <SectionTitle title="Notification Preferences" />
              <div className="space-y-1">
                {[
                  ["Critical incidents", "Always notify immediately on all channels", true],
                  ["Cost anomalies", "Notify when spend deviates >10% from forecast", true],
                  ["AI recommendations", "Weekly digest of new optimizations", true],
                  ["Resolved incidents", "Quiet — visible in dashboard only", false],
                  ["Marketing & product updates", "Monthly newsletter", false],
                ].map(([t, d, on]) => (
                  <Row key={t as string} title={t as string} desc={d as string} on={on as boolean} />
                ))}
              </div>
            </Card>
          )}

          {active === "org" && (
            <Card>
              <SectionTitle title="Organization" />
              <Field label="Organization name" defaultValue="Acme Corp" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field label="Billing email" defaultValue="finance@acme.com" />
                <Field label="Tax ID" defaultValue="US 47-1234567" />
              </div>
              <div className="mt-6 rounded-xl border border-border bg-white/[0.02] p-4">
                <div className="text-sm font-medium mb-1">Connected Cloud Accounts</div>
                <div className="text-xs text-muted-foreground mb-4">3 providers connected</div>
                <div className="space-y-2">
                  {[["AWS", "12 accounts"], ["GCP", "3 projects"], ["Azure", "2 subscriptions"]].map(([p, n]) => (
                    <div key={p} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{p}</span>
                      <span className="text-xs text-muted-foreground">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {active === "security" && (
            <Card>
              <SectionTitle title="Security" />
              <div className="space-y-1">
                <Row title="Two-factor authentication" desc="Require 2FA via authenticator app" on />
                <Row title="SSO (SAML)" desc="Okta integration · enforced for all members" on />
                <Row title="Session timeout" desc="Auto-logout after 30 minutes of inactivity" on />
                <Row title="IP allowlist" desc="Restrict access to corporate networks" />
              </div>
            </Card>
          )}

          {active === "api" && (
            <Card>
              <SectionTitle title="API Keys" hint="Use these to integrate CloudGuardian with your stack" />
              <div className="space-y-2">
                {[["Production", "cgk_live_•••• ••••  9f2c"], ["Staging", "cgk_test_•••• ••••  41a8"]].map(([env, key]) => (
                  <div key={env} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white/[0.02]">
                    <span className="pill text-primary border-primary/30 bg-primary/10">{env}</span>
                    <code className="text-xs font-mono text-muted-foreground flex-1">{key}</code>
                    <Button size="sm" variant="outline">Reveal</Button>
                    <Button size="sm" variant="ghost">Rotate</Button>
                  </div>
                ))}
              </div>
              <Button size="sm" className="mt-4">Generate new key</Button>
            </Card>
          )}

          {active === "theme" && (
            <Card>
              <SectionTitle title="Theme" />
              <div className="grid grid-cols-3 gap-3">
                {[["Midnight", "#0B1020", true], ["Slate", "#1F2937"], ["Obsidian", "#000814"]].map(([name, c, sel]) => (
                  <button key={name as string} className={`rounded-xl border-2 ${sel ? "border-primary" : "border-border"} p-4 text-left bg-white/[0.02]`}>
                    <div className="h-16 rounded-md mb-3" style={{ background: c as string }} />
                    <div className="text-sm font-medium">{name}</div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="mt-1.5 w-full h-10 rounded-lg border border-border bg-white/[0.03] px-3 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition" />
    </label>
  );
}

function Row({ title, desc, on }: { title: string; desc: string; on?: boolean }) {
  const [v, setV] = useState(!!on);
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button onClick={() => setV(!v)} className={`relative h-6 w-11 rounded-full transition ${v ? "grad-primary" : "bg-white/[0.08]"}`}>
        <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${v ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
