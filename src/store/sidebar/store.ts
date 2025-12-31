import { create } from "zustand";
import type { SidebarState } from "./type";

// 服务端和客户端初始状态保持一致，默认收起
export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: true,
  initialized: false,
  setIsCollapsed: (value) => set({ isCollapsed: value }),
  setInitialized: (value) => set({ initialized: value }),
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
