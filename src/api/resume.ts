"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { config, getApiUrl } from "@/lib/config";

export interface ResumeUsage {
  generateUsed: number;
  generateLimit: number;
  generateRemaining: number;
  analyzeUsed: number;
  analyzeLimit: number;
  analyzeRemaining: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ==================== 获取使用量 ====================

export function useResumeUsage() {
  return useQuery({
    queryKey: ["resumeUsage"],
    queryFn: async () => {
      const response = await fetch(
        getApiUrl(config.api.resumeGenerator.usage),
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        throw new Error("获取使用量失败");
      }

      const data = await response.json();
      return data.usage as ResumeUsage;
    },
    staleTime: 30 * 1000,
  });
}

