"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { config, getApiUrl } from "@/lib/config";

// ==================== Types ====================

export type ResumeStatus = "draft" | "generated" | "optimized";

export interface Resume {
  id: string;
  userId: string;
  jobInfoId: string | null;
  name: string;
  content: string | null;
  stylePrompt: string | null;
  status: ResumeStatus | null;
  createdAt: number;
  updatedAt: number;
}

// 默认样式 Prompt
export const DEFAULT_STYLE_PROMPT = `请生成一份专业、美观的 HTML 格式简历，要求：
1. 使用现代化设计风格，配色以深蓝色(#1e3a5f)为主色调，白色为背景
2. 头部区域包含姓名（大号加粗）、职位头衔、联系方式（电话、邮箱、地址等横向排列）
3. 结构清晰，包含：个人简介、工作经历、项目经验、教育背景、技能特长
4. 使用卡片式布局，各模块有适当间距和圆角
5. 工作经历和项目经验使用时间线样式展示
6. 技能使用标签样式展示
7. 整体宽度适合 A4 纸打印，内边距适中`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  success: boolean;
  conversationId: string;
  message?: ChatMessage;
  isComplete?: boolean;
  collectedInfo?: any;
}

export interface StreamEvent {
  type: "text" | "done" | "error";
  content?: string;
  resumeId?: string;
  message?: string;
  score?: number | null;
}

// ==================== 获取简历列表 ====================

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const response = await fetch(
        getApiUrl(config.api.resumeGenerator.resumes),
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        throw new Error("获取简历列表失败");
      }

      const data = await response.json();
      return data.resumes as Resume[];
    },
    staleTime: 0,
  });
}

// ==================== 获取简历详情 ====================

export function useResume(id: string | undefined) {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      if (!id) throw new Error("简历 ID 不能为空");
      const response = await fetch(
        getApiUrl(config.api.resumeGenerator.resumeDetail(id)),
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 404) {
          throw new Error("简历不存在");
        }
        throw new Error("获取简历详情失败");
      }

      const data = await response.json();
      return data.resume as Resume;
    },
    enabled: !!id,
  });
}

// ==================== 删除简历 ====================

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        getApiUrl(config.api.resumeGenerator.resumeDetail(id)),
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "删除简历失败");
      }
    },
    onSuccess: async () => {
      toast.success("删除成功");
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "删除失败，请重试");
    },
  });
}

// ==================== 开始对话 ====================

export async function startResumeChat(
  useProfile: boolean = false,
): Promise<ChatResponse> {
  const response = await fetch(
    getApiUrl(config.api.resumeGenerator.chat.start),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ useProfile }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "开始对话失败");
  }

  return response.json();
}

// ==================== 发送对话消息 ====================

export async function sendChatMessage(
  conversationId: string,
  message: string,
): Promise<ChatResponse> {
  const response = await fetch(
    getApiUrl(config.api.resumeGenerator.chat.send(conversationId)),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "发送消息失败");
  }

  return response.json();
}

// ==================== AI 生成简历（异步任务 + 轮询） ====================

export interface GenerateResumeData {
  resumeId?: string;
  conversationId: string;
  jobInfoId?: string;
  stylePrompt?: string;
  model?: "deepseek" | "gemini";
  language?: "zh" | "en";
  useProfile?: boolean;
}

export interface GenerateProgressResponse {
  success: boolean;
  status: "generating" | "completed" | "error";
  progress: number;
  content: string;
  error: string | null;
}

// 创建生成任务
export async function generateResume(
  data: GenerateResumeData,
  onEvent: (event: StreamEvent) => void,
): Promise<void> {
  const response = await fetch(getApiUrl(config.api.resumeGenerator.generate), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 429) {
      throw new Error(errorData.message || "今日简历生成次数已用完");
    }
    throw new Error(errorData.message || "生成简历失败");
  }

  const result = await response.json();
  if (result.resumeId) {
    // 返回 resumeId，前端需要跳转到详情页或开始轮询
    onEvent({
      type: "done",
      resumeId: result.resumeId,
      message: result.message,
    });
  }
}

// 轮询简历详情（检查是否生成完成）
export async function pollResumeCompletion(
  resumeId: string,
  onUpdate: (resume: Resume) => void,
  interval: number = 2000,
): Promise<Resume> {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const response = await fetch(
          getApiUrl(config.api.resumeGenerator.resumeDetail(resumeId)),
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("获取简历详情失败");
        }

        const data = await response.json();
        const resume = data.resume as Resume;

        // 通知更新
        onUpdate(resume);

        // 如果有内容，说明生成完成
        if (resume.content) {
          resolve(resume);
        } else {
          // 继续轮询
          setTimeout(poll, interval);
        }
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
}

// ==================== 辅助函数 ====================

export function getStatusLabel(status: ResumeStatus | null): string {
  if (!status) return "草稿";
  const labels: Record<ResumeStatus, string> = {
    draft: "草稿",
    generated: "已生成",
    optimized: "已优化",
  };
  return labels[status];
}
