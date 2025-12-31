"use client";

import { ChevronLeft, Clock, Square } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface InterviewHeaderProps {
  title: string;
  model?: string;
  language?: string;
  formattedTime: string;
  onEnd: () => void;
  isEnding?: boolean;
}

export function InterviewHeader({
  title,
  model,
  language,
  formattedTime,
  onEnd,
  isEnding,
}: InterviewHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
      <button
        onClick={() => router.push("/dashboard/interview")}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden md:inline">返回</span>
      </button>

      <h1 className="text-sm md:text-lg font-semibold text-white truncate max-w-[120px] md:max-w-none">
        {title}
      </h1>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2 text-white/60 text-sm">
          <span className="px-2 py-1 bg-white/10 rounded">
            {model === "deepseek" ? "DeepSeek" : "Gemini"}
          </span>
          <span className="px-2 py-1 bg-white/10 rounded">
            {language === "en" ? "EN" : "中文"}
          </span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-white/70 text-sm">
          <Clock className="w-4 h-4" />
          <span>{formattedTime}</span>
        </div>
        <button
          onClick={onEnd}
          disabled={isEnding}
          className="px-2 md:px-4 py-1.5 md:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-xs md:text-sm"
        >
          <span className="hidden md:inline">结束面试</span>
          <Square className="w-4 h-4 md:hidden" />
        </button>
      </div>
    </div>
  );
}
