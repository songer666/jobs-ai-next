'use client';

import { ReactNode, createContext, useContext, useState, useCallback } from 'react';
import { AnalysisHistorySidebar } from '@/components/resume-analyzer/AnalysisHistorySidebar';

interface ResumeAnalyzerLayoutContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    addNewAnalysis: (id: string) => void;
    newAnalysisId: string | null;
    clearNewAnalysis: () => void;
}

const ResumeAnalyzerLayoutContext = createContext<ResumeAnalyzerLayoutContextType | null>(null);

export function useResumeAnalyzerLayout() {
    const context = useContext(ResumeAnalyzerLayoutContext);
    if (!context) {
        throw new Error('useResumeAnalyzerLayout must be used within ResumeAnalyzerLayout');
    }
    return context;
}

interface ResumeAnalyzerLayoutProps {
    children: ReactNode;
}

export default function ResumeAnalyzerLayout({ children }: ResumeAnalyzerLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [newAnalysisId, setNewAnalysisId] = useState<string | null>(null);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    const addNewAnalysis = useCallback((id: string) => {
        setNewAnalysisId(id);
    }, []);

    const clearNewAnalysis = useCallback(() => {
        setNewAnalysisId(null);
    }, []);

    return (
        <ResumeAnalyzerLayoutContext.Provider value={{ 
            sidebarOpen, 
            toggleSidebar, 
            addNewAnalysis, 
            newAnalysisId,
            clearNewAnalysis 
        }}>
            <div className="relative flex h-full w-full">
                {/* 主内容区域 */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>

                {/* 右侧历史记录侧边栏 */}
                <AnalysisHistorySidebar />
            </div>
        </ResumeAnalyzerLayoutContext.Provider>
    );
}
