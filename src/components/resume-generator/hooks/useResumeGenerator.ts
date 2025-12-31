"use client";

import { useState, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useResumes,
  startResumeChat,
  sendChatMessage,
  generateResume,
  DEFAULT_STYLE_PROMPT,
  type ChatMessage,
} from "@/api/resume-generator";
import { useResumeUsage } from "@/api/resume";
import type { GeneratorLanguage, GeneratorModel } from "../components";

export type WizardStep = 1 | 2 | 3;
export type GeneratorPhase =
  | "idle"
  | "wizard"
  | "chatting"
  | "generating"
  | "done";

export function useResumeGenerator() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: resumes,
    isLoading: resumesLoading,
    refetch: refetchResumes,
  } = useResumes();
  const { data: usage } = useResumeUsage();

  const [phase, setPhase] = useState<GeneratorPhase>("idle");
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedResumeId, setGeneratedResumeId] = useState<string | null>(
    null,
  );

  // 配置选项
  const [selectedJobInfoId, setSelectedJobInfoId] = useState("");
  const [language, setLanguage] = useState<GeneratorLanguage>("zh");
  const [model, setModel] = useState<GeneratorModel>("deepseek");

  // 样式 Prompt
  const [stylePrompt, setStylePrompt] = useState(DEFAULT_STYLE_PROMPT);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 开始创建简历流程（进入向导）
  const startWizard = useCallback(() => {
    setPhase("wizard");
    setWizardStep(1);
  }, []);

  // 下一步
  const nextStep = useCallback(() => {
    if (wizardStep < 3) {
      setWizardStep((prev) => (prev + 1) as WizardStep);
    }
  }, [wizardStep]);

  // 上一步
  const prevStep = useCallback(() => {
    if (wizardStep > 1) {
      setWizardStep((prev) => (prev - 1) as WizardStep);
    }
  }, [wizardStep]);

  // 开始生成流程（点击"开始生成"按钮）- 直接生成，不询问
  const startGeneration = useCallback(async () => {
    setIsLoading(true);

    try {
      // 直接开始对话并生成，使用 profile 或匿名
      const chatResult = await startResumeChat(true);
      const conversationId = chatResult.conversationId;

      // 直接创建简历记录并跳转到详情页
      await generateResume(
        {
          conversationId,
          jobInfoId: selectedJobInfoId || undefined,
          stylePrompt,
          model,
          language,
          useProfile: true,
        },
        (event) => {
          if (event.type === "done") {
            // 跳转到详情页，详情页会自动开始生成
            if (event.resumeId) {
              queryClient.invalidateQueries({ queryKey: ["resumes"] });
              router.push(
                `/dashboard/resume-generator/${event.resumeId}?autoGenerate=true`,
              );
            }
          } else if (event.type === "error") {
            toast.error(event.message || "生成失败");
          }
        },
      );
    } catch (error: any) {
      toast.error(error.message || "开始生成失败");
    } finally {
      setIsLoading(false);
    }
  }, [selectedJobInfoId, model, language, stylePrompt, queryClient, router]);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || !conversationId || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(conversationId, inputValue);
      if (response.message) {
        setMessages((prev) => [...prev, response.message!]);
      }
      if (response.isComplete) {
        // 对话完成，开始生成
        setPhase("generating");
        setGeneratedText("");

        await generateResume(
          {
            conversationId,
            jobInfoId: selectedJobInfoId || undefined,
            stylePrompt,
            model,
            language,
            useProfile: true,
          },
          (event) => {
            if (event.type === "text" && event.content) {
              setGeneratedText((prev) => prev + event.content);
            } else if (event.type === "done") {
              toast.success("简历生成成功！");
              queryClient.invalidateQueries({ queryKey: ["resumes"] });
              queryClient.invalidateQueries({ queryKey: ["resumeUsage"] });
              if (event.resumeId) {
                setGeneratedResumeId(event.resumeId);
              }
              setPhase("done");
            } else if (event.type === "error") {
              toast.error(event.message || "生成失败");
              setPhase("chatting");
            }
          },
        );
      }
      scrollToBottom();
    } catch (error: any) {
      toast.error(error.message || "发送消息失败");
    } finally {
      setIsLoading(false);
    }
  }, [
    inputValue,
    conversationId,
    isLoading,
    scrollToBottom,
    selectedJobInfoId,
    stylePrompt,
    model,
    language,
    queryClient,
  ]);

  const reset = useCallback(() => {
    setPhase("idle");
    setWizardStep(1);
    setResumeId(null);
    setConversationId(null);
    setMessages([]);
    setInputValue("");
    setGeneratedText("");
    setGeneratedResumeId(null);
    setStylePrompt(DEFAULT_STYLE_PROMPT);
  }, []);

  return {
    // 数据
    resumes,
    resumesLoading,
    usage,

    // 状态
    phase,
    wizardStep,
    resumeId,
    conversationId,
    messages,
    inputValue,
    isLoading,
    generatedText,
    generatedResumeId,

    // 配置
    selectedJobInfoId,
    language,
    model,
    stylePrompt,

    // Refs
    messagesEndRef,

    // 操作
    setInputValue,
    setSelectedJobInfoId,
    setLanguage,
    setModel,
    setStylePrompt,
    startWizard,
    nextStep,
    prevStep,
    startGeneration,
    sendMessage,
    reset,
    refetchResumes,
  };
}
