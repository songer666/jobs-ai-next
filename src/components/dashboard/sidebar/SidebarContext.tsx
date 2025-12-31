"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // 初始化时根据屏幕尺寸设置
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return true;
  });

  useEffect(() => {
    // lg以上屏幕默认展开，lg以下默认收缩
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 1024;
      setIsCollapsed((prev) => {
        // 只在状态真正需要改变时才更新，避免不必要的重新渲染
        if (prev !== shouldCollapse) {
          return shouldCollapse;
        }
        return prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
