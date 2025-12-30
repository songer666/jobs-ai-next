"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface QueryProviderProps {
    children: ReactNode
}

// 在模块级别创建 QueryClient 实例，确保在整个应用生命周期中保持单例
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5分钟内数据保持新鲜
            gcTime: 10 * 60 * 1000, // 10分钟后清除未使用的缓存
            refetchOnWindowFocus: false, // 窗口聚焦时不自动重新请求
            refetchOnMount: false, // 组件挂载时不自动重新请求（使用缓存）
            refetchOnReconnect: false, // 网络重连时不自动重新请求
            retry: 1, // 失败后重试1次
        },
        mutations: {
            retry: 0, // mutation 失败不重试
        },
    },
})

// 为 better-auth session 查询设置特殊配置
queryClient.setQueryDefaults(['better-auth', 'session'], {
    staleTime: 10 * 60 * 1000, // session 10分钟内保持新鲜
    gcTime: 30 * 60 * 1000, // session 30分钟后清除
    refetchOnMount: false, // 不在组件挂载时重新请求
    refetchOnWindowFocus: false, // 不在窗口聚焦时重新请求
})

export default function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
