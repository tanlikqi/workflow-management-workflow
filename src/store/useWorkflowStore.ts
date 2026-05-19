import { create } from "zustand";
import type { Edge, Node, NodeChange, EdgeChange } from "@xyflow/react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import type { IconTileTone } from "@/components/ui/IconTile";

export type StepKind = "trigger" | "step";

export interface StepNodeData extends Record<string, unknown> {
  kind: StepKind;
  title: string;
  description: string;
  tone: IconTileTone;
  iconKey: string;
  primaryOutcome?: { label: string; iconKey: string };
  secondaryOutcome?: { label: string; iconKey: string };
  likes: number;
  dislikes: number;
}

export type WorkflowNode = Node<StepNodeData>;

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  setGraph: (graph: { nodes: WorkflowNode[]; edges: Edge[] }) => void;
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  selectNode: (id: string | null) => void;
  updateNode: (id: string, patch: Partial<StepNodeData>) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setGraph: ({ nodes, edges }) => set({ nodes, edges }),
  onNodesChange: (changes) =>
    set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) })),
  onEdgesChange: (changes) =>
    set((s) => ({ edges: applyEdgeChanges(changes, s.edges) })),
  selectNode: (id) => set({ selectedNodeId: id }),
  updateNode: (id, patch) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n,
      ),
    })),
}));
