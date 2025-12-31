"use client";

import { Sparkles } from "lucide-react";
import { useResumeGenerator } from "./hooks";
import { workspaceStyles as styles } from "./styles";
import { useTranslations } from "next-intl";
import { WorkspaceHeader, ConfigPanel, StylePromptInput } from "./components";

export function ResumeGeneratorWorkspace() {
  const t = useTranslations("resumeGenerator");
  const {
    usage,
    isLoading,
    selectedJobInfoId,
    language,
    model,
    stylePrompt,
    setSelectedJobInfoId,
    setLanguage,
    setModel,
    setStylePrompt,
    startGeneration,
  } = useResumeGenerator();

  // 只显示配置表单，点击生成后直接跳转到详情页
  return (
    <div className={styles.container}>
      <WorkspaceHeader subtitle={t("workspace.subtitle")} />

      <div className="space-y-6">
        {/* 配置面板 */}
        <ConfigPanel
          selectedJobInfoId={selectedJobInfoId}
          language={language}
          model={model}
          onJobChange={setSelectedJobInfoId}
          onLanguageChange={setLanguage}
          onModelChange={setModel}
        />

        {/* 样式设置 */}
        <StylePromptInput value={stylePrompt} onChange={setStylePrompt} />

        {/* 个人信息提示 */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400 text-sm font-medium">
              {t("workspace.tip")}
            </span>
          </div>
          <p className="text-white/60 text-sm">
            {t("workspace.tipDescription")}
          </p>
        </div>

        {/* 生成按钮 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={startGeneration}
            disabled={isLoading || (usage && usage.generateRemaining <= 0)}
            className={`${styles.primaryButton} ${isLoading || (usage && usage.generateRemaining <= 0) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 inline mr-2 animate-pulse" />
                {t("workspace.generatingBtn")}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 inline mr-2" />
                {t("workspace.startGenerate")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
