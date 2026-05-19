import { useEffect } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ToastTone = "info" | "success" | "warning";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
  durationMs?: number;
}

const iconByTone: Record<ToastTone, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-violet-300" />,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-400" />,
};

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-[320px] flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const ms = toast.durationMs ?? 3500;
    const handle = window.setTimeout(onDismiss, ms);
    return () => window.clearTimeout(handle);
  }, [toast.durationMs, onDismiss]);

  return (
    <div
      className={cn(
        "pointer-events-auto panel-tight bg-app-panel/95 backdrop-blur-md p-3 shadow-panel animate-slide-in-right",
        "flex items-start gap-3",
      )}
    >
      <div className="mt-0.5">{iconByTone[toast.tone ?? "info"]}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-ink">{toast.title}</div>
        {toast.description && (
          <div className="mt-0.5 text-xs text-ink-muted">{toast.description}</div>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-ink-muted hover:text-ink transition"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
