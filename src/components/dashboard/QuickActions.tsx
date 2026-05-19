import { useNavigate } from "react-router-dom";
import { Sparkles, UserPlus, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useUiStore } from "@/store/useUiStore";

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function QuickActions() {
  const navigate = useNavigate();
  const pushToast = useUiStore((s) => s.pushToast);

  const items: ActionItem[] = [
    {
      label: "New call flow",
      icon: <Sparkles className="h-4 w-4 text-brand-violet" />,
      onClick: () => {
        navigate("/workflows");
        pushToast({
          title: "New call flow",
          description: "Opening the workflow builder.",
          tone: "info",
        });
      },
    },
    {
      label: "Add AI agent",
      icon: <UserPlus className="h-4 w-4 text-pink-400" />,
      onClick: () =>
        pushToast({
          title: "Add AI agent",
          description: "Agent creation coming soon.",
          tone: "info",
        }),
    },
    {
      label: "View analytics",
      icon: <BarChart3 className="h-4 w-4 text-amber-400" />,
      onClick: () => navigate("/analytics"),
    },
  ];

  return (
    <Card className="h-full">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Quick actions
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="inline-flex items-center gap-2.5 rounded-lg border border-app-border/60 bg-white/5 px-3 py-2.5 text-sm text-ink hover:bg-white/10 transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
