import { NavLink } from "react-router-dom";
import { Search, Share2, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const tabs = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/workflows", label: "Workflows" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/integrations", label: "Integrations" },
  { to: "/analytics", label: "Analytics" },
  { to: "/test", label: "Test" },
];

export function TopBar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 px-6">
      <nav className="flex items-center gap-1">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-1.5 text-sm transition",
                isActive
                  ? "bg-white/10 text-ink shadow-sm border border-app-border/60"
                  : "text-ink-muted hover:text-ink hover:bg-white/5",
              )
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="soft" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="soft" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="primary" size="icon" aria-label="Publish">
          <Play className="h-4 w-4 fill-white" />
        </Button>
      </div>
    </header>
  );
}
