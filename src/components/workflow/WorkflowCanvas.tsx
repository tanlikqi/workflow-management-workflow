import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Loader2, RotateCw } from "lucide-react";
import { TriggerNode } from "@/components/workflow/nodes/TriggerNode";
import { StepNode } from "@/components/workflow/nodes/StepNode";
import { ZoomControls } from "@/components/workflow/ZoomControls";
import { useWorkflowStore, type WorkflowNode } from "@/store/useWorkflowStore";
import { apiFetch } from "@/lib/api";

const nodeTypes = {
  trigger: TriggerNode,
  step: StepNode,
};

export const WORKFLOW_ID = "incoming-call-routing";

interface WorkflowResponse {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

function CanvasInner() {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const selectNode = useWorkflowStore((s) => s.selectNode);
  const setGraph = useWorkflowStore((s) => s.setGraph);

  const { data, isLoading, isError, refetch } = useQuery<WorkflowResponse>({
    queryKey: ["workflow", WORKFLOW_ID],
    queryFn: () => apiFetch<WorkflowResponse>(`/api/workflows/${WORKFLOW_ID}`),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setGraph({ nodes: data.nodes, edges: data.edges });
    }
  }, [data, setGraph]);

  if (isLoading && nodes.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-ink-muted">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading workflow…
      </div>
    );
  }

  if (isError && nodes.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
        <div className="text-sm text-rose-300">Couldn't load the workflow.</div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-app-border/70 bg-white/5 px-3 py-1.5 text-xs text-ink hover:bg-white/10 transition"
        >
          <RotateCw className="h-3 w-3" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, n) => selectNode(n.id)}
      onPaneClick={() => selectNode(null)}
      fitView
      fitViewOptions={{ padding: 0.25 }}
      proOptions={{ hideAttribution: true }}
      minZoom={0.4}
      maxZoom={1.8}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={20}
        size={1}
        color="#23263d"
      />
      <ZoomControls />
    </ReactFlow>
  );
}

export function WorkflowCanvas() {
  const wrapperClassName = useMemo(
    () =>
      "relative h-full w-full overflow-hidden rounded-2xl border border-app-border/70 bg-app-panel/40",
    [],
  );

  return (
    <div className={wrapperClassName}>
      <ReactFlowProvider>
        <CanvasInner />
      </ReactFlowProvider>
    </div>
  );
}
