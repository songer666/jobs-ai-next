"use client";

import { Loader2 } from "lucide-react";
import { useInterview } from "@/api/interview";
import { InterviewSession } from "@/components/interview/InterviewSession";

interface InterviewSessionWrapperProps {
  interviewId: string;
}

export function InterviewSessionWrapper({
  interviewId,
}: InterviewSessionWrapperProps) {
  const { data: interview, isLoading } = useInterview(interviewId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b081a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-[#0b081a] flex items-center justify-center">
        <p className="text-white/60">面试记录不存在</p>
      </div>
    );
  }

  // 所有状态都使用 InterviewSession 组件（已完成的显示聊天记录，结果页面在 /result 路由）
  return <InterviewSession interviewId={interviewId} />;
}
