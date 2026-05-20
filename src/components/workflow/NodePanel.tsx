import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { NodeIcon } from "@/components/workflow/nodeIcons";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { cn } from "@/lib/cn";

const tabs = ["Purpose", "Behavior", "Rules", "Resources"] as const;
type Tab = (typeof tabs)[number];

export function NodePanel() {
  const selectedId = useWorkflowStore((s) => s.selectedNodeId);
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const selectNode = useWorkflowStore((s) => s.selectNode);
  const updateNode = useWorkflowStore((s) => s.updateNode);

  const [tab, setTab] = useState<Tab>("Purpose");

  const node = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId],
  );

  const connected = useMemo(() => {
    if (!node) return [];
    return edges
      .filter((e) => e.source === node.id)
      .map((e) => nodes.find((n) => n.id === e.target))
      .filter((n): n is NonNullable<typeof n> => Boolean(n));
  }, [edges, node, nodes]);

  if (!node) return null;

  const isStep = node.data.kind === "step";

  return (
    <aside className="absolute right-4 top-4 bottom-4 z-20 flex w-[360px] flex-col overflow-hidden rounded-2xl border border-app-border/70 bg-app-panel/90 backdrop-blur-md shadow-panel animate-slide-in-right">
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex items-center gap-3">
          <IconTile tone={node.data.tone} size="md">
            <NodeIcon iconKey={node.data.iconKey} className="h-[18px] w-[18px]" />
          </IconTile>
          <h2 className="text-base font-semibold tracking-tight text-ink">
            {node.data.title}
          </h2>
        </div>
        <button
          onClick={() => selectNode(null)}
          aria-label="Close"
          className="grid h-7 w-7 place-items-center rounded-lg text-ink-muted hover:bg-white/5 hover:text-ink transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="mt-4 flex items-center gap-5 border-b border-app-border/60 px-5">
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative pb-2.5 text-sm transition",
                active ? "text-brand-violet" : "text-ink-muted hover:text-ink",
              )}
            >
              {t}
              {active && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-violet" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="min-h-0 flex-1 overflow-auto px-5 py-5">
        {tab === "Purpose" && (
          <PurposeTab node={node} connected={connected} updateNode={updateNode} isStep={isStep} />
        )}
      </div>
    </aside>
  );
}

function PurposeTab({
  node,
  connected,
  updateNode,
  isStep,
}: {
  node: NonNullable<ReturnType<typeof useWorkflowStore.getState>["nodes"][number]>;
  connected: ReturnType<typeof useWorkflowStore.getState>["nodes"];
  updateNode: ReturnType<typeof useWorkflowStore.getState>["updateNode"];
  isStep: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Step name">
        <input
          value={node.data.title}
          onChange={(e) => updateNode(node.id, { title: e.target.value })}
          className="h-9 w-full rounded-lg border border-app-border/70 bg-app-subtle px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
        />
      </Field>

      <Field label="What this step is responsible for">
        <textarea
          rows={5}
          value={node.data.description}
          onChange={(e) => updateNode(node.id, { description: e.target.value })}
          className="w-full resize-none rounded-lg border border-app-border/70 bg-app-subtle px-3 py-2 text-sm leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          placeholder={isStep ? "Describe what this step does and how it should behave." : "Trigger nodes start the flow."}
        />
      </Field>

      {node.data.primaryOutcome && (
        <Field label="Primary outcome">
          <OutcomePill
            label={node.data.primaryOutcome.label}
            iconKey={node.data.primaryOutcome.iconKey}
          />
        </Field>
      )}

      {node.data.secondaryOutcome && (
        <Field label="Secondary outcome">
          <OutcomePill
            label={node.data.secondaryOutcome.label}
            iconKey={node.data.secondaryOutcome.iconKey}
          />
        </Field>
      )}

      {connected.length > 0 && (
        <Field label="Connected to">
          <div className="flex flex-wrap gap-2">
            {connected.map((n) => (
              <span
                key={n.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-app-border/70 bg-app-subtle px-2.5 py-1 text-xs text-ink"
              >
                <ArrowRight className="h-3 w-3 text-ink-muted" />
                {n.data.title}
              </span>
            ))}
          </div>
        </Field>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </div>
      {children}
    </div>
  );
}

function OutcomePill({ label, iconKey }: { label: string; iconKey: string }) {
  return (
    <div className="inline-flex w-full items-center gap-2 rounded-lg border border-app-border/70 bg-app-subtle px-3 py-2 text-sm text-ink">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-white/5 text-ink-muted">
        <NodeIcon iconKey={iconKey} className="h-3.5 w-3.5" />
      </span>
      {label}
    </div>
  );
}

