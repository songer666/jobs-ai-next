"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { config, getApiUrl } from "@/lib/config"
import { useRouter } from "@/i18n/navigation"

// ==================== Types ====================

export type InterviewStatus = "pending" | "in_progress" | "evaluating" | "completed"

export interface Interview {
    id: string
    userId: string
    jobInfoId: string
    duration: number | null
    chatId: string | null
    feedback: string | null
    score: number | null
    status: InterviewStatus | null
    language: InterviewLanguage | null
    model: AIModel | null
    createdAt: number
    updatedAt: number
    jobInfo?: {
        id: string
        name: string
        title: string | null
        experienceLevel: string
    } | null
}

export interface InterviewUsage {
    used: number
    limit: number
    remaining: number
}

export type InterviewLanguage = 'zh' | 'en'
export type AIModel = 'gemini' | 'deepseek'

export interface CreateInterviewData {
    jobInfoId: string
    language?: InterviewLanguage
    model?: AIModel
}

export interface UpdateInterviewData {
    duration?: number
    chatId?: string
    feedback?: string
    score?: number
    status?: InterviewStatus
}

interface InterviewListResponse {
    success: boolean
    interviews: Interview[]
}

interface InterviewResponse {
    success: boolean
    interview: Interview
    message?: string
}

interface UsageResponse {
    success: boolean
    usage: InterviewUsage
}

// ==================== 获取使用量 ====================

export function useInterviewUsage() {
    return useQuery({
        queryKey: ["interviewUsage"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.interview.usage), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取使用量失败")
            }
            
            const data: UsageResponse = await response.json()
            return data.usage
        },
        staleTime: 30 * 1000, // 30秒
    })
}

// ==================== 获取面试列表 ====================

export function useInterviews() {
    return useQuery({
        queryKey: ["interviews"],
        queryFn: async () => {
            const response = await fetch(getApiUrl(config.api.interview.list), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                throw new Error("获取面试列表失败")
            }
            
            const data: InterviewListResponse = await response.json()
            return data.interviews || []
        },
        staleTime: 0,
    })
}

// ==================== 获取单个面试 ====================

export function useInterview(id: string | undefined) {
    return useQuery({
        queryKey: ["interview", id],
        queryFn: async () => {
            if (!id) throw new Error("面试 ID 不能为空")
            const response = await fetch(getApiUrl(config.api.interview.detail(id)), {
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 404) {
                    throw new Error("面试不存在")
                }
                throw new Error("获取面试详情失败")
            }
            
            const data: InterviewResponse = await response.json()
            return data.interview
        },
        enabled: !!id,
    })
}

// ==================== 创建面试 ====================

export function useCreateInterview() {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    return useMutation({
        mutationFn: async (data: CreateInterviewData) => {
            const response = await fetch(getApiUrl(config.api.interview.base), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 429) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || "今日面试次数已用完")
                }
                const errorData = await response.json()
                throw new Error(errorData.message || "创建面试失败")
            }
            
            const result: InterviewResponse = await response.json()
            return result.interview
        },
        onSuccess: async (interview) => {
            toast.success("面试创建成功")
            await queryClient.invalidateQueries({ queryKey: ["interviews"] })
            await queryClient.invalidateQueries({ queryKey: ["interviewUsage"] })
            // 跳转到面试页面
            router.push(`/dashboard/interview/${interview.id}`)
        },
        onError: (error: Error) => {
            toast.error(error.message || "创建失败，请重试")
        },
    })
}

// ==================== 更新面试 ====================

export function useUpdateInterview() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateInterviewData }) => {
            const response = await fetch(getApiUrl(config.api.interview.detail(id)), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 403) {
                    throw new Error("无权限修改此面试")
                }
                const errorData = await response.json()
                throw new Error(errorData.message || "更新面试失败")
            }
            
            const result: InterviewResponse = await response.json()
            return result.interview
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["interviews"] })
            await queryClient.invalidateQueries({ queryKey: ["interview", variables.id] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "更新失败，请重试")
        },
    })
}

// ==================== 删除面试 ====================

export function useDeleteInterview() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(getApiUrl(config.api.interview.detail(id)), {
                method: "DELETE",
                credentials: "include",
            })
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("未登录")
                }
                if (response.status === 403) {
                    throw new Error("无权限删除此面试")
                }
                throw new Error("删除面试失败")
            }
        },
        onSuccess: async () => {
            toast.success("删除成功")
            await queryClient.invalidateQueries({ queryKey: ["interviews"] })
        },
        onError: (error: Error) => {
            toast.error(error.message || "删除失败，请重试")
        },
    })
}

// ==================== AI 相关 API ====================

export interface GenerateQuestionResult {
    reachedLimit: boolean
    message?: string
}

export async function generateQuestion(
    interviewId: string,
    difficulty: "easy" | "medium" | "hard" = "medium",
    onChunk: (chunk: string) => void
): Promise<GenerateQuestionResult> {
    const response = await fetch(getApiUrl(config.api.interview.ai.generateQuestion), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ interviewId, difficulty }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        // 如果达到问题限制，返回特殊结果
        if (response.status === 429) {
            return { reachedLimit: true, message: errorData.message }
        }
        throw new Error(errorData.message || "生成问题失败")
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("无法读取响应流")

    const decoder = new TextDecoder()
    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        onChunk(chunk)
    }
    
    return { reachedLimit: false }
}

export async function submitAnswer(
    interviewId: string,
    question: string,
    answer: string,
    onChunk: (chunk: string) => void
): Promise<void> {
    const response = await fetch(getApiUrl(config.api.interview.ai.submitAnswer), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ interviewId, question, answer }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "提交答案失败")
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("无法读取响应流")

    const decoder = new TextDecoder()
    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        onChunk(chunk)
    }
}

export interface CompleteInterviewResult {
    success: boolean
    feedback: string
    score: number | null
    message: string
}

export interface ConversationMessage {
    role: "user" | "assistant"
    content: string
}

export async function completeInterview(
    interviewId: string,
    conversationHistory: ConversationMessage[],
    duration: number
): Promise<CompleteInterviewResult> {
    const response = await fetch(getApiUrl(`${config.api.interview.base}/complete`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ interviewId, conversationHistory, duration }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "完成面试失败")
    }

    return response.json()
}

// ==================== 聊天消息 API ====================

export interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
    createdAt: string
}

export async function getChatMessages(interviewId: string): Promise<ChatMessage[]> {
    const response = await fetch(getApiUrl(`${config.api.interview.detail(interviewId)}/messages`), {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("获取聊天消息失败")
    }

    const data = await response.json()
    return data.messages || []
}

export async function addChatMessage(
    interviewId: string,
    role: "user" | "assistant",
    content: string
): Promise<ChatMessage> {
    const response = await fetch(getApiUrl(`${config.api.interview.detail(interviewId)}/messages`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role, content }),
    })

    if (!response.ok) {
        throw new Error("添加聊天消息失败")
    }

    const data = await response.json()
    return data.message
}

// ==================== 面试计时 API ====================

export interface TimerResponse {
    success: boolean
    elapsedTime: number
    maxDuration: number
    exceeded?: boolean
    message?: string
}

const MAX_INTERVIEW_DURATION = 2 * 60 * 60 // 2小时（秒）

export async function getInterviewTimer(interviewId: string): Promise<TimerResponse> {
    const response = await fetch(getApiUrl(`${config.api.interview.detail(interviewId)}/timer`), {
        credentials: "include",
    })

    if (!response.ok) {
        return { success: false, elapsedTime: 0, maxDuration: MAX_INTERVIEW_DURATION }
    }

    return response.json()
}

export async function startInterviewTimer(interviewId: string): Promise<TimerResponse> {
    const response = await fetch(getApiUrl(config.api.interview.timer.start(interviewId)), {
        method: "POST",
        credentials: "include",
    })

    if (!response.ok) {
        return { success: false, elapsedTime: 0, maxDuration: MAX_INTERVIEW_DURATION }
    }

    return response.json()
}
