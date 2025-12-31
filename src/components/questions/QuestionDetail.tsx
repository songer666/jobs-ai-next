"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  Star,
  Sparkles,
  Trash2,
  AlertCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertDialog } from "@heroui/react";
import { CodeBlock } from "@/components/common/CodeBlock";
import {
  useQuestion,
  useDeleteQuestion,
  submitAnswer,
  type StreamEvent,
  getDifficultyLabel,
} from "@/api/question";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { detailStyles as styles, difficultyStyleMap } from "./styles/detail";

interface QuestionDetailProps {
  questionId: string;
}

export function QuestionDetail({ questionId }: QuestionDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: question, isLoading, error } = useQuestion(questionId);
  const deleteMutation = useDeleteQuestion();
  const t = useTranslations("questions");

  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const feedbackEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedback) {
      feedbackEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [feedback]);

  const handleSubmit = useCallback(async () => {
    if (!answer.trim()) {
      toast.error(t("answerInput.error"));
      return;
    }

    setIsSubmitting(true);
    setFeedback("");
    setScore(null);

    try {
      await submitAnswer(questionId, { answer }, (event: StreamEvent) => {
        if (event.type === "text" && event.content) {
          setFeedback((prev) => prev + event.content);
        } else if (event.type === "done") {
          setScore(event.score ?? null);
        } else if (event.type === "error") {
          throw new Error(event.message);
        }
      });

      await queryClient.invalidateQueries({
        queryKey: ["question", questionId],
      });
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("detail.submitFailed"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [answer, questionId, queryClient, t]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync(questionId);
      setIsDeleteOpen(false);
      router.push("/dashboard/questions");
    } catch {
      // Error handled by mutation
    }
  }, [questionId, deleteMutation, router]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <Sparkles className={styles.errorIcon} />
          <p>{error?.message || t("detail.notFound")}</p>
        </div>
      </div>
    );
  }

  const hasExistingFeedback = !!question.feedback;
  const displayFeedback = feedback || question.feedback || "";
  const displayScore = score ?? question.score;
  const displayAnswer = question.answer || answer;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{t("detail.title")}</h1>
          <p className={styles.subtitle}>
            {question.jobInfo?.name || "技术题练习"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          className={styles.deleteButton}
          title={t("detail.delete")}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.questionCard}>
          <div className={styles.questionHeader}>
            <span className={styles.questionLabel}>{t("detail.question")}</span>
            <span
              className={`${styles.questionBadge} ${difficultyStyleMap[question.difficulty]}`}
            >
              {getDifficultyLabel(question.difficulty)}
            </span>
          </div>
          <div className={styles.questionText}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {question.text}
            </ReactMarkdown>
          </div>
        </div>

        {displayFeedback ? (
          <div className={styles.resultGrid}>
            <div className={styles.answerCard}>
              <div className={styles.answerCardLabel}>
                {t("detail.yourAnswer")}
              </div>
              <div className={styles.answerCardText}>{displayAnswer}</div>
            </div>

            <div className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <h2 className={styles.feedbackTitle}>{t("feedback.title")}</h2>
                {displayScore !== null && (
                  <div className={styles.scoreWrapper}>
                    <Star className={styles.scoreIcon} />
                    <span className={styles.scoreText}>{displayScore}/10</span>
                  </div>
                )}
                {isSubmitting && (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                )}
              </div>
              <div className={styles.feedbackContent}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children }) {
                      const content = String(children).replace(/\n$/, "");
                      const isInline = !className;
                      return (
                        <CodeBlock className={className} inline={isInline}>
                          {content}
                        </CodeBlock>
                      );
                    },
                  }}
                >
                  {displayFeedback}
                </ReactMarkdown>
              </div>
              <div ref={feedbackEndRef} />
            </div>
          </div>
        ) : (
          <div className={styles.answerSection}>
            <label className={styles.answerLabel}>
              {t("answerInput.label")}
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={t("answerInput.placeholder")}
              className={styles.textarea}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !answer.trim()}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("answerInput.submitting")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("answerInput.submit")}
                </>
              )}
            </button>
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
                    {t("detail.deleteConfirm.title")}
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {t("detail.deleteConfirm.message", {
                      name: question.jobInfo?.name || "此题目",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors"
                >
                  {t("detail.deleteConfirm.cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                >
                  {deleteMutation.isPending
                    ? t("detail.deleteConfirm.deleting")
                    : t("detail.deleteConfirm.confirm")}
                </button>
              </div>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
