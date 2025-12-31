"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  FileDown,
  Loader2,
  FileText,
  Calendar,
  RefreshCw,
  Settings,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertDialog } from "@heroui/react";
import { toast } from "sonner";
import { config, getApiUrl } from "@/lib/config";
import {
  getStatusLabel,
  type Resume,
  generateResume,
  pollResumeCompletion,
  DEFAULT_STYLE_PROMPT,
  useDeleteResume,
} from "@/api/resume-generator";
import { detailStyles as styles } from "./styles/detail";
import { useTranslations } from "next-intl";

interface ResumeDetailViewProps {
  resumeId: string;
}

// 获取简历详情
async function fetchResumeDetail(id: string): Promise<Resume> {
  const response = await fetch(
    getApiUrl(config.api.resumeGenerator.resumeDetail(id)),
    {
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("获取简历详情失败");
  }
  const data = await response.json();
  return data.resume;
}

export function ResumeDetailView({ resumeId }: ResumeDetailViewProps) {
  const t = useTranslations("resumeGenerator");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const deleteMutation = useDeleteResume();

  const [showRegeneratePanel, setShowRegeneratePanel] = useState(false);
  const [stylePrompt, setStylePrompt] = useState(DEFAULT_STYLE_PROMPT);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data: resume,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => fetchResumeDetail(resumeId),
  });

  const getStatusClass = (status: string | null) => {
    switch (status) {
      case "optimized":
        return styles.statusOptimized;
      case "generated":
        return styles.statusGenerated;
      default:
        return styles.statusDraft;
    }
  };

  // 重新生成简历（使用 QStash + 轮询数据库）
  const handleRegenerate = useCallback(async () => {
    if (isRegenerating) return;

    setIsRegenerating(true);
    setShowRegeneratePanel(false);
    setStreamingContent("");

    try {
      // 1. 创建生成任务（发送到 QStash）
      await generateResume(
        {
          resumeId,
          conversationId: `regenerate-${Date.now()}`,
          stylePrompt: stylePrompt || DEFAULT_STYLE_PROMPT,
          useProfile: true,
        },
        (event) => {
          // 任务创建成功，开始轮询数据库
          if (event.type === "done" && event.resumeId) {
            // 开始轮询简历详情
            pollResumeCompletion(
              event.resumeId,
              (updatedResume) => {
                // 每次轮询更新时，如果有内容就显示
                if (updatedResume.content) {
                  setStreamingContent(updatedResume.content);
                }
              },
              2000, // 每2秒轮询一次
            )
              .then(() => {
                // 生成完成
                toast.success("简历生成成功！");
                queryClient.invalidateQueries({
                  queryKey: ["resume", resumeId],
                });
                queryClient.invalidateQueries({ queryKey: ["resumes"] });
                queryClient.invalidateQueries({ queryKey: ["resumeUsage"] });
                setStreamingContent("");
                setIsRegenerating(false);
                refetch();
              })
              .catch((error) => {
                toast.error(error.message || "生成失败");
                setStreamingContent("");
                setIsRegenerating(false);
              });
          }
        },
      );
    } catch (error: any) {
      toast.error(error.message || "重新生成失败");
      setStreamingContent("");
      setIsRegenerating(false);
    }
  }, [resumeId, stylePrompt, queryClient, refetch, isRegenerating]);

  // 删除简历
  const handleDelete = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync(resumeId);
      setIsDeleteOpen(false);
      router.push("/dashboard/resume-generator");
    } catch {
      // Error handled by mutation
    }
  }, [resumeId, deleteMutation, router]);

  // 自动生成逻辑：如果 URL 参数包含 autoGenerate=true，且简历内容为空，自动开始轮询
  useEffect(() => {
    const autoGenerate = searchParams.get("autoGenerate");
    if (
      autoGenerate === "true" &&
      resume &&
      !resume.content &&
      !isRegenerating
    ) {
      // 移除 URL 参数
      router.replace(`/dashboard/resume-generator/${resumeId}`);
      // 自动开始轮询生成进度
      handleRegenerate();
    }
  }, [
    resume,
    searchParams,
    resumeId,
    router,
    isRegenerating,
    handleRegenerate,
  ]);

  // 转换 CSS 为 Word 兼容格式
  const convertToWordCompatible = (html: string): string => {
    let result = html;
    // 将 linear-gradient 转换为纯色背景
    result = result.replace(
      /background:\s*linear-gradient\([^)]+\)/gi,
      "background-color: #1e3a5f",
    );
    result = result.replace(
      /background-image:\s*linear-gradient\([^)]+\)/gi,
      "background-color: #1e3a5f",
    );
    // 移除 box-shadow（Word 不支持）
    result = result.replace(/box-shadow:[^;]+;/gi, "");
    // 将 gap 转换为 margin（Word 不支持 gap）
    result = result.replace(/gap:\s*(\d+)px/gi, "");
    // 确保 flexbox 布局在 Word 中有基本效果
    result = result.replace(/display:\s*flex/gi, "display: block");
    return result;
  };

  // 导出 HTML 文件（可用 Word 打开）
  const handleDownloadWord = useCallback(() => {
    const content = resume?.content;
    if (!content) return;

    try {
      // 转换为 Word 兼容的 CSS
      const wordContent = convertToWordCompatible(content);

      // 包装 HTML 内容，添加 Word 兼容的 meta 标签
      const htmlContent = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page { size: A4; margin: 1.5cm; }
        body { font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif; line-height: 1.6; }
        header { background-color: #1e3a5f !important; color: white !important; padding: 20px; text-align: center; }
        header h1 { color: white !important; margin: 0; font-size: 24pt; }
        header p { color: white !important; margin: 5px 0; }
        header span { color: white !important; margin: 0 10px; }
        section { margin-bottom: 15px; }
        h2 { color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 5px; font-size: 14pt; }
        h3 { color: #333; font-size: 12pt; margin: 10px 0 5px; }
        p, li { font-size: 11pt; color: #333; }
    </style>
</head>
<body>
    ${wordContent}
</body>
</html>`;

      // 创建 Blob 并下载
      const blob = new Blob([htmlContent], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume?.name || "简历"}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(t("detail.export.success"));
    } catch (error) {
      console.error("Export error:", error);
      toast.error(t("detail.export.failed"));
    }
  }, [resume]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className="w-8 h-8 text-[#fd409a] animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <FileText className={styles.emptyIcon} />
          <div className={styles.emptyTitle}>{t("detail.notFound")}</div>
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-4 text-orange-400 hover:text-orange-300"
          >
            {t("detail.backToList")}
          </button>
        </div>
      </div>
    );
  }

  // 显示的内容（流式生成时优先显示流式内容）
  const displayContent = streamingContent || resume.content;

  // 判断是否正在生成：content 为空或正在重新生成
  const isGenerating = !resume.content || isRegenerating;

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.backButton}
        >
          <ArrowLeft className="w-5 h-5" />
          {t("detail.back")}
        </button>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => setShowRegeneratePanel(!showRegeneratePanel)}
            className={styles.actionButton}
            disabled={isGenerating}
          >
            <RefreshCw
              className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            {t("detail.regenerate")}
          </button>
          <button
            type="button"
            onClick={handleDownloadWord}
            className={styles.downloadButton}
            disabled={!displayContent}
          >
            <FileDown className="w-4 h-4" />
            {t("detail.downloadWord")}
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="w-4 h-4" />
            {t("detail.delete")}
          </button>
        </div>
      </div>

      {/* 重新生成面板 */}
      {showRegeneratePanel && (
        <div className={styles.regeneratePanel}>
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-[#fd409a]" />
            <span className="text-white font-medium">样式设置</span>
          </div>
          <textarea
            value={stylePrompt}
            onChange={(e) => setStylePrompt(e.target.value)}
            placeholder="请输入简历样式要求..."
            className={styles.textarea}
            rows={4}
          />
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={() => setShowRegeneratePanel(false)}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className={styles.primaryButton}
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  生成中...
                </>
              ) : (
                "开始生成"
              )}
            </button>
          </div>
        </div>
      )}

      {/* 简历信息卡片 */}
      <div className={styles.card}>
        <div className="flex items-start justify-between mb-4">
          <h1 className={styles.title}>{resume.name}</h1>
          <span
            className={`${styles.statusBadge} ${getStatusClass(resume.status)}`}
          >
            {getStatusLabel(resume.status)}
          </span>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Calendar className="w-4 h-4" />
            创建于 {new Date(resume.createdAt).toLocaleDateString("zh-CN")}
          </div>
          {resume.stylePrompt && (
            <div className={styles.metaItem}>
              <FileText className="w-4 h-4" />
              已设置样式
            </div>
          )}
        </div>
      </div>

      {/* 简历内容预览 */}
      <div className={styles.card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={styles.cardTitle}>简历预览</h2>
          {isGenerating && (
            <div className="flex items-center gap-2 text-[#fd409a]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">正在生成...</span>
            </div>
          )}
        </div>

        {displayContent ? (
          <div
            ref={resumeContentRef}
            className={styles.resumePreview}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: AI 生成的简历 HTML
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 text-[#fd409a] animate-spin" />
            <div className="text-center">
              <p className="text-white text-lg font-medium mb-2">
                正在生成简历...
              </p>
              <p className="text-white/60 text-sm">
                AI 正在为您生成专业简历，请稍候
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[500px] bg-[#2a2a2a] border border-white/10">
              <AlertDialog.CloseTrigger />
              <div className="flex items-start gap-4 pb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    删除简历？
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    确定要永久删除{" "}
                    <span className="text-white font-medium">
                      {resume?.name || "此简历"}
                    </span>{" "}
                    吗？此操作无法撤销。
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                >
                  {deleteMutation.isPending ? "删除中..." : "删除"}
                </button>
              </div>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
