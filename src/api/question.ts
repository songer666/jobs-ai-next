"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { config, getApiUrl } from "@/lib/config";

// ==================== Types ====================

export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionLanguage = "zh" | "en";
export type AIModel = "gemini" | "deepseek";

export interface Question {
  id: string;
  userId: string;
  jobInfoId: string;
  text: string;
  difficulty: QuestionDifficulty;
  answer: string | null;
  feedback: string | null;
  score: number | null;
  createdAt: number;
  updatedAt: number;
  jobInfo?: {
    id: string;
    name: string;
    title: string | null;
  } | null;
}

export interface QuestionUsage {
  used: number;
  limit: number;
  remaining: number;
}

export interface GenerateQuestionData {
  jobInfoId: string;
  difficulty?: QuestionDifficulty;
  language?: QuestionLanguage;
  model?: AIModel;
}

interface QuestionListResponse {
  success: boolean;
  questions: Question[];
}

interface QuestionResponse {
  success: boolean;
  question: Question | null;
  message?: string;
}

interface UsageResponse {
  success: boolean;
  usage: QuestionUsage;
}

// ==================== 获取使用量 ====================

export function useQuestionUsage() {
  return useQuery({
    queryKey: ["questionUsage"],
    queryFn: async () => {
      const response = await fetch(getApiUrl(config.api.question.usage), {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        throw new Error("获取使用量失败");
      }

      const data: UsageResponse = await response.json();
      return data.usage;
    },
    staleTime: 30 * 1000,
  });
}

// ==================== 获取题目列表 ====================

export function useQuestions(jobInfoId?: string) {
  return useQuery({
    queryKey: ["questions", jobInfoId],
    queryFn: async () => {
      const url = jobInfoId
        ? `${config.api.question.list}?jobInfoId=${jobInfoId}`
        : config.api.question.list;
      const response = await fetch(getApiUrl(url), {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        throw new Error("获取题目列表失败");
      }

      const data: QuestionListResponse = await response.json();
      return data.questions || [];
    },
    staleTime: 0,
  });
}

// ==================== 获取单个题目 ====================

export function useQuestion(id: string | undefined) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      if (!id) throw new Error("题目 ID 不能为空");
      const response = await fetch(getApiUrl(config.api.question.detail(id)), {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 404) {
          throw new Error("题目不存在");
        }
        throw new Error("获取题目详情失败");
      }

      const data: QuestionResponse = await response.json();
      return data.question;
    },
    enabled: !!id,
  });
}

// ==================== 生成题目（流式） ====================

export interface StreamEvent {
  type: "text" | "done" | "error";
  content?: string;
  questionId?: string;
  message?: string;
  score?: number | null;
}

export async function generateQuestion(
  data: GenerateQuestionData,
  onEvent: (event: StreamEvent) => void,
): Promise<void> {
  const response = await fetch(getApiUrl(config.api.question.generate), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 429) {
      throw new Error(errorData.message || "今日题目练习次数已用完");
    }
    throw new Error(errorData.message || "生成题目失败");
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("无法读取响应流");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const event: StreamEvent = JSON.parse(line.slice(6));
          onEvent(event);
        } catch {
          // 忽略解析错误
        }
      }
    }
  }
}

// ==================== 提交答案（流式） ====================

export interface SubmitAnswerData {
  answer: string;
  language?: QuestionLanguage;
  model?: AIModel;
}

export async function submitAnswer(
  questionId: string,
  data: SubmitAnswerData,
  onEvent: (event: StreamEvent) => void,
): Promise<void> {
  const response = await fetch(
    getApiUrl(config.api.question.submit(questionId)),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "提交答案失败");
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("无法读取响应流");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const event: StreamEvent = JSON.parse(line.slice(6));
          onEvent(event);
        } catch {
          // 忽略解析错误
        }
      }
    }
  }
}

// ==================== 删除题目 ====================

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(getApiUrl(config.api.question.detail(id)), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 403) {
          throw new Error("无权限删除此题目");
        }
        throw new Error("删除题目失败");
      }
    },
    onSuccess: async () => {
      toast.success("删除成功");
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
      await queryClient.invalidateQueries({ queryKey: ["questionUsage"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "删除失败，请重试");
    },
  });
}

// ==================== 辅助函数 ====================

export function getDifficultyLabel(difficulty: QuestionDifficulty): string {
  const labels: Record<QuestionDifficulty, string> = {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  };
  return labels[difficulty];
}
