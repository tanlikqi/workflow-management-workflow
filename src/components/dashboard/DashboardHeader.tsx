import { Bell, Phone, Search } from "lucide-react";
import { dashboardUser } from "@/data/mock";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          type="text"
          placeholder="Search flows, calls, records…"
          className="h-10 w-full rounded-xl border border-app-border/70 bg-app-panel/60 pl-9 pr-3 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-xl border border-app-border/70 bg-app-panel/60 text-ink-muted hover:text-ink hover:bg-white/5 transition"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          aria-label="Calls"
          className="grid h-10 w-10 place-items-center rounded-xl border border-app-border/70 bg-app-panel/60 text-ink-muted hover:text-ink hover:bg-white/5 transition"
        >
          <Phone className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2.5 rounded-xl border border-app-border/70 bg-app-panel/60 py-1.5 pl-1.5 pr-3">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 text-[10px] font-semibold text-white">
            {dashboardUser.initials}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium text-ink">{dashboardUser.name}</div>
            <div className="text-[11px] text-ink-muted">{dashboardUser.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
