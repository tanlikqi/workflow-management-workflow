import { useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerNode } from "@/components/workflow/nodes/TriggerNode";
import { StepNode } from "@/components/workflow/nodes/StepNode";
import { ZoomControls } from "@/components/workflow/ZoomControls";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { initialEdges, initialNodes } from "@/data/workflow";

const nodeTypes = {
  trigger: TriggerNode,
  step: StepNode,
};

function CanvasInner() {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const selectNode = useWorkflowStore((s) => s.selectNode);
  const setGraph = useWorkflowStore((s) => s.setGraph);

  useEffect(() => {
    if (nodes.length === 0) {
      setGraph({ nodes: initialNodes, edges: initialEdges });
    }
  }, [nodes.length, setGraph]);

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
    () => "relative h-full w-full overflow-hidden rounded-2xl border border-app-border/70 bg-app-panel/40",
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
