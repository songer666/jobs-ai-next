"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { config, getApiUrl } from "@/lib/config"

// ==================== Types ====================

export type ResumeCategory = "professional" | "creative" | "simple" | "modern" | "academic"
export type ResumeStatus = "draft" | "generated" | "optimized"

export interface ResumeTemplate {
    id: string
    userId: string
    name: string
    description: string | null
    thumbnailUrl: string | null
    content?: any
    styles?: any
    category: ResumeCategory
    isPublic: boolean
    useCount: number
    createdAt: number
    updatedAt: number
}

export interface Resume {
    id: string
    userId: string
    templateId: string | null
    jobInfoId: string | null
    name: string
    content: any | null
    rawText: string | null
    r2Key: string | null
    r2Url: string | null
    score: number | null
    feedback: string | null
    analysisResult: any | null
    status: ResumeStatus
    isPublic: boolean
    createdAt: number
    updatedAt: number
    template?: {
        id: string
        name: string
        category: ResumeCategory
    } | null
}

export interface ResumeUsage {
    generateUsed: number
    generateLimit: number
    generateRemaining: number
    analyzeUsed: number
    analyzeLimit: number
    analyzeRemaining: number
}

export interface ChatMessage {
    role: "user" | "assistant"
    content: string
}

export interface ChatResponse {
    success: boolean
    conversationId: string
    message?: ChatMessage
    isComplete?: boolean
    collectedInfo?: any
}

// ==================== 获取使用量 ====================

export function useResumeUsage() {
    return useQuery({
        queryKey: ["resumeUsage"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.resumeGenerator.usage), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取使用量失败")
            }
            
            const data = await response.json()
            return data.usage as ResumeUsage
        },
        staleTime: 30 * 1000,
    })
}

// ==================== 获取模板列表 ====================

export function useResumeTemplates() {
    return useQuery({
        queryKey: ["resumeTemplates"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.resume.templates), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取模板列表失败")
            }
            
            const data = await response.json()
            return data.templates as ResumeTemplate[]
        },
        staleTime: 5 * 60 * 1000,
    })
}

// ==================== 获取模板详情 ====================

export function useResumeTemplate(id: string | undefined) {
    return useQuery({
        queryKey: ["resumeTemplate", id],
        queryFn: async () => {
            if (!id) throw new Error("模板 ID 不能为空")
            const response = await fetch(getApiUrl(config.api.resume.templateDetail(id)), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 404) {
                    throw new Error("模板不存在")
                }
                throw new Error("获取模板详情失败")
            }
            
            const data = await response.json()
            return data.template as ResumeTemplate
        },
        enabled: !!id,
    })
}

// ==================== 获取简历列表 ====================

export function useResumes() {
    return useQuery({
        queryKey: ["resumes"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.resume.list), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取简历列表失败")
            }
            
            const data = await response.json()
            return data.resumes as Resume[]
        },
        staleTime: 0,
    })
}

// ==================== 获取简历详情 ====================

export function useResume(id: string | undefined) {
    return useQuery({
        queryKey: ["resume", id],
        queryFn: async () => {
            if (!id) throw new Error("简历 ID 不能为空")
            const response = await fetch(getApiUrl(config.api.resume.detail(id)), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 404) {
                    throw new Error("简历不存在")
                }
                throw new Error("获取简历详情失败")
            }
            
            const data = await response.json()
            return data.resume as Resume
        },
        enabled: !!id,
    })
}

// ==================== 创建简历 ====================

export interface CreateResumeData {
    name: string
    templateId?: string
    content?: any
    jobInfoId?: string
}

export function useCreateResume() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (data: CreateResumeData) => {
            const response = await fetch(getApiUrl(config.api.resume.base), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            })
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "创建简历失败")
            }
            
            const result = await response.json()
            return result.resume as Resume
        },
        onSuccess: async () => {
            toast.success("创建成功")
            await queryClient.invalidateQueries({ queryKey: ["resumes"] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "创建失败，请重试")
        },
    })
}

// ==================== 更新简历 ====================

export interface UpdateResumeData {
    name?: string
    templateId?: string
    content?: any
    status?: ResumeStatus
}

export function useUpdateResume() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateResumeData }) => {
            const response = await fetch(getApiUrl(config.api.resume.detail(id)), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            })
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "更新简历失败")
            }
            
            const result = await response.json()
            return result.resume as Resume
        },
        onSuccess: async (_, { id }) => {
            toast.success("更新成功")
            await queryClient.invalidateQueries({ queryKey: ["resumes"] })
            await queryClient.invalidateQueries({ queryKey: ["resume", id] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "更新失败，请重试")
        },
    })
}

// ==================== 删除简历 ====================

export function useDeleteResume() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(getApiUrl(config.api.resume.detail(id)), {
                method: "DELETE",
                credentials: "include",
            })
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "删除简历失败")
            }
        },
        onSuccess: async () => {
            toast.success("删除成功")
            await queryClient.invalidateQueries({ queryKey: ["resumes"] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "删除失败，请重试")
        },
    })
}

// ==================== 开始对话 ====================

export async function startResumeChat(): Promise<ChatResponse> {
    const response = await fetch(getApiUrl(config.api.resume.chat.start), {
        method: "POST",
        credentials: "include",
    })
    
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "开始对话失败")
    }
    
    return response.json()
}

// ==================== 发送对话消息 ====================

export async function sendChatMessage(
    conversationId: string,
    message: string
): Promise<ChatResponse> {
    const response = await fetch(getApiUrl(config.api.resume.chat.send), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ conversationId, message }),
    })
    
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "发送消息失败")
    }
    
    return response.json()
}

// ==================== 流式事件类型 ====================

export interface StreamEvent {
    type: "text" | "done" | "error"
    content?: string
    resumeId?: string
    message?: string
    score?: number | null
}

// ==================== AI 生成简历（流式） ====================

export interface GenerateResumeData {
    templateId: string
    conversationId: string
    jobInfoId?: string
}

export async function generateResume(
    data: GenerateResumeData,
    onEvent: (event: StreamEvent) => void
): Promise<void> {
    const response = await fetch(getApiUrl(config.api.resume.generate), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429) {
            throw new Error(errorData.message || "今日简历生成次数已用完")
        }
        throw new Error(errorData.message || "生成简历失败")
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

// ==================== AI 分析简历（流式） ====================

export interface AnalyzeResumeData {
    jobInfoId?: string
    jobDescription?: string
}

export async function analyzeResume(
    resumeId: string,
    data: AnalyzeResumeData,
    onEvent: (event: StreamEvent) => void
): Promise<void> {
    const response = await fetch(getApiUrl(config.api.resume.analyze(resumeId)), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
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

// ==================== 辅助函数 ====================

export function getCategoryLabel(category: ResumeCategory): string {
    const labels: Record<ResumeCategory, string> = {
        professional: "专业",
        creative: "创意",
        simple: "简洁",
        modern: "现代",
        academic: "学术",
    }
    return labels[category]
}

export function getCategoryColor(category: ResumeCategory): "primary" | "secondary" | "success" | "warning" | "danger" {
    const colors: Record<ResumeCategory, "primary" | "secondary" | "success" | "warning" | "danger"> = {
        professional: "primary",
        creative: "secondary",
        simple: "success",
        modern: "warning",
        academic: "danger",
    }
    return colors[category]
}

export function getStatusLabel(status: ResumeStatus): string {
    const labels: Record<ResumeStatus, string> = {
        draft: "草稿",
        generated: "已生成",
        optimized: "已优化",
    }
    return labels[status]
}

export function getStatusColor(status: ResumeStatus): "default" | "primary" | "success" {
    const colors: Record<ResumeStatus, "default" | "primary" | "success"> = {
        draft: "default",
        generated: "primary",
        optimized: "success",
    }
    return colors[status]
}
