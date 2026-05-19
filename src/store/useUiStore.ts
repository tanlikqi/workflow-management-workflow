import { create } from "zustand";
import type { ToastItem } from "@/components/ui/Toast";

interface UiState {
  toasts: ToastItem[];
  pushToast: (toast: Omit<ToastItem, "id"> & { id?: string }) => void;
  dismissToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  pushToast: (toast) => {
    const id = toast.id ?? `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
