import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter } from "lucide-react";
import { AreaChart, BarsChart, Button, Card, DonutChart, PageHeader, SectionTitle, Sparkline } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/cost-analytics")({
  head: () => ({ meta: [{ title: "Cost Analytics — CloudGuardian AI" }] }),
  component: CostAnalytics,
});

const trend = [42,46,44,49,53,51,58,62,60,67,72,70,78,82,79,86,92,88,95,102,98,108,115,124];
const monthly = [9.2,10.1,8.6,11.4,12.7,13.5,12.0,14.1,15.6,14.2,16.8,18.5];

function CostAnalytics() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Cost Analytics"
        title="Spend Intelligence"
        subtitle="Multi-cloud cost analysis with anomaly detection, tag-based breakdowns, and forecasting."
        actions={<><Button variant="outline" size="sm"><Filter className="size-3.5" /> Filter</Button><Button size="sm"><Download className="size-3.5" /> Export</Button></>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Daily Spend" hint="Across all providers" />
          <div className="h-72"><AreaChart data={trend} gradientId="caG" /></div>
        </Card>
        <Card>
          <SectionTitle title="Provider Mix" />
          <div className="flex justify-center my-4">
            <DonutChart segments={[
              { label: "AWS", value: 6820, color: "#F59E0B" },
              { label: "GCP", value: 3140, color: "#3B82F6" },
              { label: "Azure", value: 2490, color: "#4F46E5" },
            ]} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Monthly Spend" />
          <div className="h-64"><BarsChart data={monthly} /></div>
        </Card>
        <Card padded={false}>
          <div className="p-5 pb-3"><SectionTitle title="Top Services" hint="By spend & change" /></div>
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-y border-border">
                <th className="text-left font-medium py-2 pl-5">Service</th>
                <th className="text-right font-medium">Spend</th>
                <th className="text-right font-medium">Δ</th>
                <th className="text-right font-medium pr-5">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EC2","$3,820","+12%",[3,4,5,6,7,8,9],"text-warning"],
                ["RDS","$2,100","+38%",[2,3,3,4,6,8,10],"text-danger"],
                ["S3","$1,840","+3%",[5,5,5,6,6,6,6],"text-success"],
                ["CloudFront","$1,200","-4%",[6,5,5,5,4,4,4],"text-success"],
                ["Lambda","$640","+9%",[2,3,3,4,4,5,5],"text-warning"],
                ["DynamoDB","$430","+1%",[3,3,3,3,3,4,4],"text-muted-foreground"],
              ].map((row) => (
                <tr key={row[0] as string} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="py-3 pl-5 font-medium">{row[0]}</td>
                  <td className="text-right tabular-nums">{row[1]}</td>
                  <td className={`text-right tabular-nums ${row[4]}`}>{row[2]}</td>
                  <td className="pr-5 w-28"><Sparkline data={row[3] as number[]} color="var(--primary)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
