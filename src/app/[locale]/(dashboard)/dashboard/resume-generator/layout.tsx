"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { ResumeHistorySidebar } from "@/components/resume-generator/ResumeHistorySidebar";

interface ResumeGeneratorLayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  addNewResume: (id: string) => void;
  newResumeId: string | null;
  clearNewResume: () => void;
}

const ResumeGeneratorLayoutContext =
  createContext<ResumeGeneratorLayoutContextType | null>(null);

export function useResumeGeneratorLayout() {
  const context = useContext(ResumeGeneratorLayoutContext);
  if (!context) {
    throw new Error(
      "useResumeGeneratorLayout must be used within ResumeGeneratorLayout",
    );
  }
  return context;
}

interface ResumeGeneratorLayoutProps {
  children: ReactNode;
}

export default function ResumeGeneratorLayout({
  children,
}: ResumeGeneratorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newResumeId, setNewResumeId] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const addNewResume = useCallback((id: string) => {
    setNewResumeId(id);
  }, []);

  const clearNewResume = useCallback(() => {
    setNewResumeId(null);
  }, []);

  return (
    <ResumeGeneratorLayoutContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        addNewResume,
        newResumeId,
        clearNewResume,
      }}
    >
      <div className="relative flex h-full w-full">
        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* 右侧历史记录侧边栏 */}
        <ResumeHistorySidebar />
      </div>
    </ResumeGeneratorLayoutContext.Provider>
  );
}
