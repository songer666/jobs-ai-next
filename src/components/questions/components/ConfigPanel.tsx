"use client";

import { Sparkles } from "lucide-react";
import { useGoalPositions } from "@/api/goal-position";
import type { QuestionDifficulty, QuestionLanguage } from "@/api/question";
import { workspaceStyles as styles } from "../styles/workspace";
import { DIFFICULTIES, LANGUAGE_OPTIONS } from "../types";
import { useTranslations } from "next-intl";

interface ConfigPanelProps {
  selectedJobInfoId: string;
  difficulty: QuestionDifficulty;
  language: QuestionLanguage;
  onJobChange: (id: string) => void;
  onDifficultyChange: (d: QuestionDifficulty) => void;
  onLanguageChange: (l: QuestionLanguage) => void;
  onStart: () => void;
}

export function ConfigPanel({
  selectedJobInfoId,
  difficulty,
  language,
  onJobChange,
  onDifficultyChange,
  onLanguageChange,
  onStart,
}: ConfigPanelProps) {
  const t = useTranslations("questions");
  const { data: jobInfos, isLoading: isLoadingJobs } = useGoalPositions(true);

  return (
    <div className={styles.configSection}>
      <div className={styles.configCard}>
        <h2 className={styles.configTitle}>
          <Sparkles className="inline w-5 h-5 mr-2 text-primary" />
          {t("config.title")}
        </h2>

        <div>
          <label className={styles.label}>{t("config.selectPosition")}</label>
          <select
            value={selectedJobInfoId}
            onChange={(e) => onJobChange(e.target.value)}
            className={styles.select}
            disabled={isLoadingJobs}
          >
            <option value="" className={styles.option}>
              {isLoadingJobs ? t("config.loading") : t("config.noPosition")}
            </option>
            {(jobInfos || []).map((job) => (
              <option key={job.id} value={job.id} className={styles.option}>
                {job.name} - {job.title || job.experienceLevel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>{t("config.selectDifficulty")}</label>
          <div className={styles.difficultyGroup}>
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => onDifficultyChange(d.value)}
                className={`${styles.difficultyButton} ${
                  difficulty === d.value
                    ? styles.difficultyActive
                    : styles.difficultyInactive
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={styles.label}>{t("config.selectLanguage")}</label>
          <div className={styles.difficultyGroup}>
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => onLanguageChange(lang.value)}
                className={`${styles.difficultyButton} ${
                  language === lang.value
                    ? styles.difficultyActive
                    : styles.difficultyInactive
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onStart}
          disabled={!selectedJobInfoId}
          className={styles.startButton}
        >
          <Sparkles className="w-5 h-5" />
          开始练习
        </button>
      </div>
    </div>
  );
}
