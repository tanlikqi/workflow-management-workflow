import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Flag } from "lucide-react";
import type { WorkflowNode } from "@/store/useWorkflowStore";

export function TriggerNode({ data }: NodeProps<WorkflowNode>) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-violet-500/60 bg-app-panel/80 px-3.5 py-2 backdrop-blur-sm shadow-[0_0_24px_-6px_rgba(124,92,255,0.6)]">
      <Flag className="h-3.5 w-3.5 text-violet-300" />
      <span className="text-sm font-medium text-ink">{data.title}</span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border-0 !bg-transparent"
      />
    </div>
  );
}
