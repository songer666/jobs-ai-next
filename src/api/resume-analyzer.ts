"use client"

import { useQuery } from "@tanstack/react-query"
import { config, getApiUrl } from "@/lib/config"

// ==================== Types ====================

export interface ResumeAnalysis {
    id: string
    userId: string
    jobInfoId: string | null
    fileName: string
    pdfR2Key: string
    feedback: string | null
    score: number | null
    jobDescription: string | null
    createdAt: number
    updatedAt: number
}

export interface AnalyzerUsage {
    analyzeUsed: number
    analyzeLimit: number
    analyzeRemaining: number
}

export interface StreamEvent {
    type: "text" | "done" | "error"
    content?: string
    message?: string
    score?: number | null
    analysisId?: string
}

// ==================== 获取分析使用量 ====================

export function useAnalyzerUsage() {
    return useQuery({
        queryKey: ["analyzerUsage"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.resumeAnalyzer.usage), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取使用量失败")
            }
            
            const data = await response.json()
            return data.usage as AnalyzerUsage
        },
        staleTime: 30 * 1000,
    })
}

// ==================== 删除分析记录 ====================

export async function deleteAnalysis(id: string): Promise<void> {
    const response = await fetch(getApiUrl(config.api.resumeAnalyzer.analysisDetail(id)), {
        method: "DELETE",
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("删除分析记录失败")
    }
}

// ==================== AI 分析简历（流式） ====================

export interface AnalyzeResumeData {
    file: File
    jobInfoId?: string
    jobDescription?: string
    model?: 'deepseek' | 'gemini'
    language?: 'zh' | 'en'
}

// ==================== 获取分析详情 ====================

export async function fetchAnalysisDetail(id: string): Promise<ResumeAnalysis> {
    const response = await fetch(getApiUrl(config.api.resumeAnalyzer.analysisDetail(id)), {
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("获取分析详情失败")
    }
    const data = await response.json()
    return data.analysis
}

// ==================== 获取分析列表 ====================

export function useAnalyses() {
    return useQuery({
        queryKey: ["analyses"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.resumeAnalyzer.analyses), {
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("获取分析列表失败")
            }
            const data = await response.json()
            return data.analyses as ResumeAnalysis[]
        },
    })
}

// ==================== AI 分析简历（流式） ====================

export async function analyzeResume(
    data: AnalyzeResumeData,
    onEvent: (event: StreamEvent) => void
): Promise<void> {
    const formData = new FormData()
    formData.append('file', data.file)
    if (data.jobInfoId) {
        formData.append('jobInfoId', data.jobInfoId)
    }
    if (data.jobDescription) {
        formData.append('jobDescription', data.jobDescription)
    }
    formData.append('model', data.model || 'deepseek')
    formData.append('language', data.language || 'zh')

    const response = await fetch(getApiUrl(config.api.resumeAnalyzer.analyze), {
        method: "POST",
        credentials: "include",
        body: formData,
    })

    if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
            throw new Error(errorData.message || "今日简历分析次数已用完")
        }
        throw new Error(errorData.message || "分析简历失败")
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("无法读取响应流")

    const decoder = new TextDecoder()
    let buffer = ""

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                try {
                    const event: StreamEvent = JSON.parse(line.slice(6))
                    onEvent(event)
                } catch {
                    // 忽略解析错误
                }
            }
        }
    }
}
