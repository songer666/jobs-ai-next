"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Clock, Star, MessageSquare, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Interview } from "@/api/interview";

interface InterviewResultProps {
  interview: Interview;
}

const styles = {
  container: "min-h-screen bg-[#0b081a]",
  header:
    "flex items-center justify-between px-6 py-4 border-b border-white/10",
  backButton:
    "flex items-center gap-2 text-white/70 hover:text-white transition-colors",
  backIcon: "w-5 h-5",
  title: "text-lg font-semibold text-white",
  main: "max-w-4xl mx-auto px-6 py-8",
  resultContainer: "space-y-8",
  resultHeader: "text-center",
  resultScore: "text-6xl font-bold text-primary mb-2",
  resultLabel: "text-white/60",
  resultStats: "flex justify-center gap-8",
  resultStat: "text-center",
  resultStatValue: "text-2xl font-semibold text-white",
  resultStatLabel: "text-sm text-white/60",
  feedbackCard: "bg-white/5 border border-white/10 rounded-xl p-6",
  feedbackTitle:
    "text-lg font-semibold text-white mb-4 flex items-center gap-2",
  feedbackIcon: "w-5 h-5 text-primary",
  feedbackContent: "prose prose-invert max-w-none",
  actions: "flex justify-center gap-4 mt-8",
  actionButton: "px-6 py-3 rounded-lg transition-colors",
  secondaryAction: "bg-white/10 hover:bg-white/15 text-white",
};

export function InterviewResult({ interview }: InterviewResultProps) {
  const t = useTranslations("interview");
  const router = useRouter();

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => router.push("/dashboard/interview")}
          className={styles.backButton}
        >
          <ChevronLeft className={styles.backIcon} />
          返回列表
        </button>
        <h1 className={styles.title}>{t("result.title")}</h1>
        <div />
      </div>

      <main className={styles.main}>
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            <div className={styles.resultScore}>{interview.score || "--"}</div>
            <div className={styles.resultLabel}>总分 / 100</div>
          </div>

          <div className={styles.resultStats}>
            <div className={styles.resultStat}>
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className={styles.resultStatValue}>
                {formatDuration(interview.duration)}
              </div>
              <div className={styles.resultStatLabel}>
                {t("result.duration")}
              </div>
            </div>
            <div className={styles.resultStat}>
              <Star className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className={styles.resultStatValue}>
                {interview.score || "--"}
              </div>
              <div className={styles.resultStatLabel}>{t("result.score")}</div>
            </div>
          </div>

          {interview.feedback && (
            <div className={styles.feedbackCard}>
              <h3 className={styles.feedbackTitle}>
                <MessageSquare className={styles.feedbackIcon} />
                {t("result.feedback")}
              </h3>
              <div className={styles.feedbackContent}>
                <ReactMarkdown>{interview.feedback}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button
              onClick={() => router.push("/dashboard/interview")}
              className={`${styles.actionButton} ${styles.secondaryAction}`}
            >
              {t("result.back")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
