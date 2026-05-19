import { Play, Zap } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";

export function AiBanner() {
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-brand-violet via-brand-purple to-pink-500 p-5 shadow-glow">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-pink-300/30 blur-2xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
          <Zap className="h-3 w-3 fill-white/90" />
          AI Powered
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
          Empower your<br />flows with AI
        </h3>
        <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-white/85">
          Leverage AI to automatically refine prompts and boost conversation
          performance.
        </p>
        <button
          onClick={() =>
            pushToast({
              title: "Take a tour",
              description: "Onboarding tour coming soon.",
              tone: "info",
            })
          }
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-white/25 transition"
        >
          <Play className="h-3 w-3 fill-white" />
          Take a tour
        </button>
      </div>
    </div>
  );
}
