"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { QuestionHistorySidebar } from "@/components/questions/QuestionHistorySidebar";

interface QuestionsLayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  addNewQuestion: (id: string) => void;
  newQuestionId: string | null;
  clearNewQuestion: () => void;
}

const QuestionsLayoutContext = createContext<QuestionsLayoutContextType | null>(
  null,
);

export function useQuestionsLayout() {
  const context = useContext(QuestionsLayoutContext);
  if (!context) {
    throw new Error("useQuestionsLayout must be used within QuestionsLayout");
  }
  return context;
}

interface QuestionsLayoutProps {
  children: ReactNode;
}

export default function QuestionsLayout({ children }: QuestionsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newQuestionId, setNewQuestionId] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const addNewQuestion = useCallback((id: string) => {
    setNewQuestionId(id);
  }, []);

  const clearNewQuestion = useCallback(() => {
    setNewQuestionId(null);
  }, []);

  return (
    <QuestionsLayoutContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        addNewQuestion,
        newQuestionId,
        clearNewQuestion,
      }}
    >
      <div className="relative flex h-full w-full">
        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* 右侧历史记录侧边栏 */}
        <QuestionHistorySidebar />
      </div>
    </QuestionsLayoutContext.Provider>
  );
}
