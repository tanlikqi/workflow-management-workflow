import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { NodeIcon } from "@/components/workflow/nodeIcons";
import type { WorkflowNode } from "@/store/useWorkflowStore";
import { cn } from "@/lib/cn";

export function StepNode({ data, selected }: NodeProps<WorkflowNode>) {
  return (
    <div
      className={cn(
        "w-[224px] cursor-pointer rounded-2xl border bg-app-panel/85 backdrop-blur-sm p-4 transition",
        selected
          ? "border-brand-violet/80 shadow-[0_0_0_1px_rgba(124,92,255,0.8),0_0_40px_-10px_rgba(124,92,255,0.6)]"
          : "border-app-border/70 hover:border-app-border hover:bg-app-panel",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border-0 !bg-transparent"
      />

      <IconTile tone={data.tone} size="md">
        <NodeIcon iconKey={data.iconKey} className="h-[18px] w-[18px]" />
      </IconTile>

      <div className="mt-3 text-sm font-semibold tracking-tight text-ink">
        {data.title}
      </div>
      {data.description && (
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          {data.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-muted">
        <span className="inline-flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" />
          <span className="tabular-nums">{data.likes}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <ThumbsDown className="h-3 w-3" />
          <span className="tabular-nums">{data.dislikes}</span>
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border-0 !bg-transparent"
      />
    </div>
  );
}
