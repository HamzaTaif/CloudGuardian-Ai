import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  LayoutDashboard, Brain, BarChart3, PiggyBank, AlertTriangle, Search as SearchIcon,
  GitBranch, Bell, FileText, Settings, ChevronLeft, ChevronRight, Command, Sun, Moon,
  ChevronDown, Cloud,
} from "lucide-react";
import { notificationsStore } from "@/lib/notifications-store";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cfo", label: "AI Cloud CFO", icon: Brain },
  { to: "/cost-analytics", label: "Cost Analytics", icon: BarChart3 },
  { to: "/savings", label: "Savings Center", icon: PiggyBank },
  { to: "/incidents", label: "Incident Analyst", icon: AlertTriangle },
  { to: "/root-cause", label: "Root Cause Analysis", icon: GitBranch },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-[76px]" : "w-[252px]"} shrink-0 sticky top-0 h-screen border-r border-border bg-bg-2/60 backdrop-blur-xl transition-[width] duration-300 ease-out flex flex-col z-30`}
      >
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-border">
          <div className="size-9 rounded-xl grad-primary flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(79,70,229,0.6)]">
            <Cloud className="size-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight animate-fade-in">
              <span className="text-[15px] font-semibold tracking-tight">CloudGuardian</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI Platform</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {!collapsed && (
            <div className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Platform
            </div>
          )}
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all ${
                  active
                    ? "bg-primary-soft text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full grad-primary" />}
                <Icon className={`size-[18px] shrink-0 ${active ? "text-primary-foreground" : ""}`} />
                {!collapsed && <span className="truncate">{label}</span>}
                {!collapsed && label === "Incident Analyst" && (
                  <span className="ml-auto text-[10px] font-semibold rounded-full bg-danger/15 text-danger px-1.5 py-0.5">8</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-white px-2.5 py-2 rounded-lg hover:bg-white/[0.04] transition"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav />
        <main className="flex-1 px-6 md:px-8 py-6 md:py-8 max-w-[1600px] w-full mx-auto animate-fade-up">
          {children}
        </main>
      </div>
    </div>
  );
}

function TopNav() {
  const [unreadCount, setUnreadCount] = useState(notificationsStore.getUnreadCount());

  useEffect(() => {
    return notificationsStore.subscribe(() => {
      setUnreadCount(notificationsStore.getUnreadCount());
    });
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 glass border-b border-border flex items-center px-6 gap-4">
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition">
        <div className="size-6 rounded-md bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">AC</div>
        <span className="hidden sm:inline">Acme Corp</span>
        <ChevronDown className="size-3.5" />
      </button>

      <div className="flex-1 max-w-xl mx-auto hidden md:block">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Search resources, incidents, reports..."
            className="w-full h-9 bg-white/[0.03] border border-border rounded-lg pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-white/[0.02]">
            <Command className="size-3" /> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <IconBtn><Sun className="size-4" /></IconBtn>
        <IconBtn>
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger pulse-ring border border-bg-1" />
          )}
        </IconBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.04] transition">
          <div className="size-7 rounded-full grad-primary flex items-center justify-center text-[11px] font-bold">SK</div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-xs font-medium">Sasha Kim</span>
            <span className="text-[10px] text-muted-foreground">Platform Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
}

function IconBtn({ children }: { children: ReactNode }) {
  return (
    <button className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/[0.05] transition">
      {children}
    </button>
  );
}
