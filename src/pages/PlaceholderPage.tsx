import { Sparkles } from "lucide-react";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="grid h-full w-full place-items-center py-20">
      <div className="panel max-w-md p-8 text-center">
        <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-purple text-white shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      </div>
    </div>
  );
}
