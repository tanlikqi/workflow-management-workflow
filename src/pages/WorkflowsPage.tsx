import { WorkflowCanvas } from "@/components/workflow/WorkflowCanvas";
import { NodePanel } from "@/components/workflow/NodePanel";

export default function WorkflowsPage() {
  return (
    <div className="relative h-full w-full py-4">
      <div className="relative h-[calc(100vh-9rem)] w-full">
        <WorkflowCanvas />
        <NodePanel />
      </div>
    </div>
  );
}
