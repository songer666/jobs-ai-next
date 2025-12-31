"use client";

import { forwardRef } from "react";
import { Loader2, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/common/CodeBlock";
import { workspaceStyles as styles } from "../styles/workspace";
import { useTranslations } from "next-intl";

interface FeedbackDisplayProps {
  feedback: string;
  score: number | null;
  isLoading?: boolean;
}

export const FeedbackDisplay = forwardRef<HTMLDivElement, FeedbackDisplayProps>(
  function FeedbackDisplay({ feedback, score, isLoading = false }, ref) {
    const t = useTranslations("questions");

    return (
      <div className={styles.feedbackCard}>
        <div className={styles.feedbackHeader}>
          <h2 className={styles.feedbackTitle}>{t("feedback.title")}</h2>
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : score !== null ? (
            <div className={styles.scoreWrapper}>
              <Star className={styles.scoreIcon} />
              <span className={styles.scoreText}>{score}/10</span>
            </div>
          ) : null}
        </div>
        {feedback && (
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
              {feedback}
            </ReactMarkdown>
          </div>
        )}
        <div ref={ref} />
      </div>
    );
  },
);
