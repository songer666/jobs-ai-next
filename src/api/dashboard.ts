"use client"

import { useQuery } from "@tanstack/react-query"
import { config, getApiUrl } from "@/lib/config"

// ==================== Types ====================

export interface DashboardStats {
    interviewCount: number
    resumeCount: number
    analysisCount: number
    questionCount: number
}

export interface DashboardUsage {
    interview: { used: number; limit: number }
    generate: { used: number; limit: number }
    analyze: { used: number; limit: number }
    question: { used: number; limit: number }
}

export interface DashboardActivity {
    type: 'interview' | 'resume' | 'analysis' | 'question'
    id: string
    title: string
    date: number
    score: number | null
}

export interface DashboardData {
    stats: DashboardStats
    usage: DashboardUsage
    recentActivities: DashboardActivity[]
}

// ==================== 获取 Dashboard 聚合数据 ====================

export function useDashboardData() {
    return useQuery({
        queryKey: ["dashboardData"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(`${config.api.dashboard}/data`), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取 Dashboard 数据失败")
            }
            
            const data = await response.json()
            return data.data as DashboardData
        },
        staleTime: 45 * 1000,
    })
}
