"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

interface StylePromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function StylePromptInput({ value, onChange }: StylePromptInputProps) {
  const t = useTranslations("resumeGenerator");

  return (
    <div className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h3 className="text-base sm:text-lg font-semibold text-white">
          {t("style.title")}
        </h3>
      </div>

      <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4">
        {t("style.description")}
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("style.placeholder")}
        className="w-full h-32 sm:h-40 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-white/40 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
      />

      <div className="mt-2 sm:mt-3 text-white/40 text-xs">{t("style.tip")}</div>
    </div>
  );
}
