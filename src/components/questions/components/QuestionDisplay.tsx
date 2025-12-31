"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { QuestionDifficulty } from "@/api/question";
import { getDifficultyLabel } from "@/api/question";
import {
  workspaceStyles as styles,
  difficultyStyleMap,
} from "../styles/workspace";

interface QuestionDisplayProps {
  questionText: string;
  difficulty: QuestionDifficulty;
}

export function QuestionDisplay({
  questionText,
  difficulty,
}: QuestionDisplayProps) {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <span className={styles.questionLabel}>题目</span>
        <span
          className={`${styles.questionBadge} ${difficultyStyleMap[difficulty]}`}
        >
          {getDifficultyLabel(difficulty)}
        </span>
      </div>
      <div className={styles.questionText}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {questionText}
        </ReactMarkdown>
      </div>
    </div>
  );
}
