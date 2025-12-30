"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { config } from "@/lib/config"

// ==================== Types ====================

export interface Profile {
    id: string
    userId: string
    realName: string | null
    phone: string | null
    location: string | null
    avatarUrl: string | null
    summary: string | null
    jobTarget: string | null
    expectedSalary: string | null
    workYears: number | null
    education: string | null
    workExperience: string | null
    projects: string | null
    skills: string | null
    certificates: string | null
    languages: string | null
    selfEvaluation: string | null
    github: string | null
    linkedin: string | null
    portfolio: string | null
    createdAt: string | number
    updatedAt: string | number
}

export interface UpdateProfileData {
    realName?: string
    phone?: string
    location?: string
    avatarUrl?: string
    summary?: string
    jobTarget?: string
    expectedSalary?: string
    workYears?: number
    education?: string
    workExperience?: string
    projects?: string
    skills?: string
    certificates?: string
    languages?: string
    selfEvaluation?: string
    github?: string
    linkedin?: string
    portfolio?: string
}

interface ProfileResponse {
    success: boolean
    profile: Profile | null
}

interface UpdateProfileResponse {
    success: boolean
    message: string
    profile: Profile
}

// ==================== API Functions ====================

const getApiUrl = (path: string) => `${config.apiUrl}${path}`

async function fetchProfile(): Promise<Profile | null> {
    const response = await fetch(getApiUrl(`${config.api.profile}/me`), {
        credentials: "include",
    })
    
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("未登录")
        }
        throw new Error("获取职业信息失败")
    }
    
    const data: ProfileResponse = await response.json()
    return data.profile
}

async function updateProfile(data: UpdateProfileData): Promise<Profile> {
    const response = await fetch(getApiUrl(`${config.api.profile}/me`), {
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
        const errorData = await response.json()
        throw new Error(errorData.message || "更新职业信息失败")
    }
    
    const result: UpdateProfileResponse = await response.json()
    return result.profile
}

// ==================== Hooks ====================

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        staleTime: Infinity, // 永不过期，只有手动 invalidate 才会重新请求
    })
}

export function useUpdateProfile() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] })
            toast.success("职业信息已保存")
        },
        onError: (error: Error) => {
            toast.error(error.message || "保存失败，请重试")
        },
    })
}
