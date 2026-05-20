import { useReactFlow } from "@xyflow/react";
import { Maximize2, Minus, Plus, X } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";

export function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const pushToast = useUiStore((s) => s.pushToast);

  const close = () => {
    pushToast({
      title: "Canvas dismissed",
      description: "Use the Workflows tab to return.",
      tone: "info",
    });
  };

  return (
    <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5 rounded-xl border border-app-border/70 bg-app-panel/80 p-1 backdrop-blur-sm shadow-panel">
      <IconButton onClick={() => zoomIn({ duration: 200 })} label="Zoom in">
        <Plus className="h-4 w-4" />
      </IconButton>
      <IconButton onClick={() => zoomOut({ duration: 200 })} label="Zoom out">
        <Minus className="h-4 w-4" />
      </IconButton>
      <IconButton onClick={() => fitView({ duration: 200, padding: 0.2 })} label="Fit view">
        <Maximize2 className="h-4 w-4" />
      </IconButton>
      <IconButton onClick={close} label="Close">
        <X className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted hover:bg-white/5 hover:text-ink transition"
    >
      {children}
    </button>
  );
}
