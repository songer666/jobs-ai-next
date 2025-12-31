"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import {
  useQuestions,
  useQuestionUsage,
  getDifficultyLabel,
} from "@/api/question";
import { Loader2, Clock, BookOpen, Plus } from "lucide-react";
import { useQuestionsLayout } from "@/app/[locale]/(dashboard)/dashboard/questions/layout";
import { useTranslations } from "next-intl";
import { sidebarStyles as styles, difficultyStyleMap } from "./styles/sidebar";

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;

  return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}

export function QuestionHistorySidebar() {
  const t = useTranslations("questions");
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, toggleSidebar, newQuestionId, clearNewQuestion } =
    useQuestionsLayout();
  const { data: questions, isLoading } = useQuestions();
  const { data: usage } = useQuestionUsage();

  const handleNewQuestion = () => {
    router.push("/dashboard/questions");
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (newQuestionId) {
      const timer = setTimeout(clearNewQuestion, 3000);
      return () => clearTimeout(timer);
    }
  }, [newQuestionId, clearNewQuestion]);

  const currentQuestionId = pathname.match(/\/questions\/([^/]+)/)?.[1];

  return (
    <>
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.wrapper} ${sidebarOpen ? styles.wrapperOpen : styles.wrapperClosed}`}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className={styles.toggleButton}
          aria-label={
            sidebarOpen
              ? t("history.toggleSidebar.close")
              : t("history.toggleSidebar.open")
          }
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <aside className={styles.sidebar}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <h2 className={styles.title}>{t("history.title")}</h2>
              <button
                type="button"
                onClick={handleNewQuestion}
                className={styles.newButton}
                title={t("history.newQuestion")}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {usage && usage.limit > 0 && (
              <div className={styles.usage}>
                <BookOpen className={styles.usageIcon} />
                <span>
                  {t("history.todayRemaining")}{" "}
                  <span className={styles.usageCount}>
                    {usage.remaining}/{usage.limit}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className={styles.list}>
            {isLoading ? (
              <div className={styles.loading}>
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : !questions || questions.length === 0 ? (
              <div className={styles.empty}>
                <BookOpen className={styles.emptyIcon} />
                <p>{t("history.empty")}</p>
                <p className="text-xs mt-1">{t("history.emptyTip")}</p>
              </div>
            ) : (
              questions.map((question) => {
                const isActive = currentQuestionId === question.id;
                const isNew = newQuestionId === question.id;

                return (
                  <Link
                    key={question.id}
                    href={`/dashboard/questions/${question.id}`}
                    className={`
                                            ${styles.item}
                                            ${isActive ? styles.itemActive : ""}
                                            ${isNew ? styles.itemNew : ""}
                                        `}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <div className={styles.itemHeader}>
                      <span
                        className={`${styles.itemDifficulty} ${difficultyStyleMap[question.difficulty]}`}
                      >
                        {getDifficultyLabel(question.difficulty)}
                      </span>
                      <span className={styles.itemTime}>
                        <Clock className="w-3 h-3" />
                        {formatTime(question.createdAt)}
                      </span>
                    </div>
                    <p className={styles.itemText}>
                      {question.text.slice(0, 80)}...
                    </p>
                    {question.score !== null && (
                      <p className={styles.itemScore}>
                        {t("history.score")}: {question.score}/10
                      </p>
                    )}
                  </Link>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
