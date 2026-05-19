import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Workflow,
  Activity,
  PuzzleIcon,
  BookOpen,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutGrid },
  { to: "/workflows", label: "Workflows", Icon: Workflow },
  { to: "/knowledge", label: "Knowledge", Icon: BookOpen },
  { to: "/integrations", label: "Integrations", Icon: PuzzleIcon },
  { to: "/analytics", label: "Analytics", Icon: Activity },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[68px] shrink-0 flex-col items-center border-r border-app-border/70 bg-app-panel/40 backdrop-blur-sm">
      <div className="mt-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-purple text-white shadow-glow">
        <Workflow className="h-5 w-5" />
      </div>

      <nav className="mt-6 flex flex-1 flex-col items-center gap-1">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              cn(
                "grid h-10 w-10 place-items-center rounded-xl transition",
                isActive
                  ? "bg-white/10 text-ink"
                  : "text-ink-muted hover:bg-white/5 hover:text-ink",
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
          </NavLink>
        ))}
      </nav>

      <div className="mb-4 flex flex-col items-center gap-3">
        <button
          aria-label="Status"
          className="grid h-10 w-10 place-items-center rounded-xl text-ink-muted hover:bg-white/5 hover:text-ink transition"
        >
          <Radio className="h-[18px] w-[18px]" />
        </button>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-[11px] font-semibold text-white">
          TD
        </div>
      </div>
    </aside>
  );
}
