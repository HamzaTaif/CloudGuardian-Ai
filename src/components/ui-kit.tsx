import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export function PageHeader({
  eyebrow, title, subtitle, actions,
}: { eyebrow?: string; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        {eyebrow && <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-2">{eyebrow}</div>}
        <h1 className="text-3xl md:text-[34px] font-semibold tracking-tight grad-text">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "", padded = true }: { children: ReactNode; className?: string; padded?: boolean }) {
  return <div className={`card-surface ${padded ? "p-5" : ""} ${className}`}>{children}</div>;
}

export function KpiCard({
  label, value, trend, trendLabel, icon: Icon, accent = "primary", suffix,
}: {
  label: string; value: number; trend?: number; trendLabel?: string;
  icon: LucideIcon; accent?: "primary" | "success" | "warning" | "danger" | "info"; suffix?: string;
}) {
  const animated = useCountUp(value);
  const accentMap = {
    primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" },
    success: { bg: "bg-success/10", text: "text-success", ring: "ring-success/20" },
    warning: { bg: "bg-warning/10", text: "text-warning", ring: "ring-warning/20" },
    danger: { bg: "bg-danger/10", text: "text-danger", ring: "ring-danger/20" },
    info: { bg: "bg-info/10", text: "text-info", ring: "ring-info/20" },
  }[accent];
  const positive = (trend ?? 0) >= 0;
  return (
    <Card className="relative overflow-hidden group">
      <div className={`absolute -top-12 -right-12 size-36 rounded-full ${accentMap.bg} blur-2xl opacity-60 group-hover:opacity-100 transition`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground font-medium">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">
            {suffix === "$" ? "$" : ""}{animated.toLocaleString()}{suffix && suffix !== "$" ? suffix : ""}
          </div>
        </div>
        <div className={`size-10 rounded-xl ${accentMap.bg} ${accentMap.text} flex items-center justify-center ring-1 ${accentMap.ring}`}>
          <Icon className="size-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="relative mt-4 flex items-center gap-2">
          <span className={`pill ${positive ? "text-success" : "text-danger"} border-white/5`}>
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-xs text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
      <div className="relative mt-4 h-1 w-full rounded-full bg-white/[0.04] overflow-hidden">
        <div className={`h-full grad-primary`} style={{ width: `${Math.min(100, 30 + Math.abs(trend ?? 40))}%` }} />
      </div>
    </Card>
  );
}

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

// ---------- Charts ----------
export function AreaChart({
  data, height = 200, color = "var(--primary)", gradientId = "g1",
}: { data: number[]; height?: number; color?: string; gradientId?: string }) {
  const w = 600, h = height, pad = 8;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [pad + i * step, h - pad - ((v - min) / range) * (h - pad * 2)] as const);
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0]},${h} L${points[0][0]},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" x2={w} y1={h * p} y2={h * p} stroke="rgba(255,255,255,0.05)" />
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 3.5 : 0} fill={color} stroke="var(--bg)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export function BarsChart({ data, color = "var(--primary)", height = 200 }: { data: number[]; color?: string; height?: number }) {
  const w = 600, h = height, pad = 8;
  const max = Math.max(...data);
  const bw = (w - pad * 2) / data.length - 6;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bg1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const x = pad + i * ((w - pad * 2) / data.length) + 3;
        const bh = (v / max) * (h - pad * 2);
        const y = h - pad - bh;
        return <rect key={i} x={x} y={y} width={bw} height={bh} rx="3" fill="url(#bg1)" />;
      })}
    </svg>
  );
}

export function DonutChart({ segments, size = 180 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  const r = size / 2 - 10, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="block" style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
      {segments.map((s, i) => {
        const len = (s.value / total) * c;
        const el = (
          <circle key={i}
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={s.color} strokeWidth="14"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
        offset += len;
        return el;
      })}
      <text x="50%" y="48%" textAnchor="middle" className="fill-white" style={{ fontSize: 22, fontWeight: 600 }}>
        ${(total / 1000).toFixed(1)}k
      </text>
      <text x="50%" y="60%" textAnchor="middle" fill="#94A3B8" style={{ fontSize: 10, letterSpacing: 2 }}>TOTAL</text>
    </svg>
  );
}

export function Sparkline({ data, color = "var(--success)" }: { data: number[]; color?: string }) {
  const w = 100, h = 28;
  const max = Math.max(...data), min = Math.min(...data);
  const step = w / (data.length - 1);
  const d = data.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7"><path d={d} fill="none" stroke={color} strokeWidth="1.5" /></svg>
  );
}

export function StatusDot({ status }: { status: "critical" | "warning" | "info" | "success" }) {
  const map = {
    critical: "bg-danger shadow-[0_0_12px_rgba(239,68,68,0.6)]",
    warning: "bg-warning shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    info: "bg-info shadow-[0_0_12px_rgba(59,130,246,0.5)]",
    success: "bg-success shadow-[0_0_12px_rgba(34,197,94,0.5)]",
  };
  return <span className={`inline-block size-2 rounded-full ${map[status]}`} />;
}

export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

export function Button({
  children, variant = "primary", size = "md", className = "", ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline"; size?: "sm" | "md" }) {
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-9 px-3.5 text-sm" };
  const variants = {
    primary: "grad-primary text-white shadow-[0_8px_24px_-12px_rgba(79,70,229,0.7)] hover:brightness-110",
    ghost: "text-muted-foreground hover:text-white hover:bg-white/[0.05]",
    outline: "border border-border text-white hover:bg-white/[0.04] hover:border-border-strong",
  };
  return (
    <button {...rest} className={`inline-flex items-center gap-2 rounded-lg font-medium transition ring-focus ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
