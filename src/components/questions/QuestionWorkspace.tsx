"use client";

import { Sparkles } from "lucide-react";
import { useQuestionWorkspace } from "./hooks/useQuestionWorkspace";
import { workspaceStyles as styles } from "./styles/workspace";
import { useTranslations } from "next-intl";
import {
  ConfigPanel,
  QuestionDisplay,
  AnswerInput,
  FeedbackDisplay,
  UserAnswerCard,
  GeneratingState,
  WorkspaceHeader,
} from "./components";

export function QuestionWorkspace() {
  const t = useTranslations("questions");
  const { config, state, refs, actions } = useQuestionWorkspace();

  // 空闲状态 - 显示配置界面
  if (state.phase === "idle") {
    return (
      <div className={styles.container}>
        <WorkspaceHeader subtitle={t("subtitle.idle")} />
        <ConfigPanel
          selectedJobInfoId={config.selectedJobInfoId}
          difficulty={config.difficulty}
          language={config.language}
          onJobChange={(id) => actions.updateConfig("selectedJobInfoId", id)}
          onDifficultyChange={(d) => actions.updateConfig("difficulty", d)}
          onLanguageChange={(l) => actions.updateConfig("language", l)}
          onStart={actions.startGenerate}
        />
      </div>
    );
  }

  // 生成中状态
  if (state.phase === "generating") {
    return (
      <div className={styles.container}>
        <WorkspaceHeader subtitle={t("subtitle.generating")} />
        <GeneratingState questionText={state.questionText} />
      </div>
    );
  }

  // 答题状态
  if (state.phase === "answering") {
    return (
      <div className={styles.container}>
        <WorkspaceHeader subtitle={t("subtitle.answering")} />
        <div className={styles.qaSection}>
          <QuestionDisplay
            questionText={state.questionText}
            difficulty={config.difficulty}
          />
          <AnswerInput
            answer={state.answer}
            onAnswerChange={(value) => actions.updateState("answer", value)}
            onSubmit={actions.submitUserAnswer}
          />
        </div>
      </div>
    );
  }

  // 提交中状态
  if (state.phase === "submitting") {
    return (
      <div className={styles.container}>
        <WorkspaceHeader subtitle={t("subtitle.submitting")} />
        <div className={styles.qaSection} ref={refs.containerRef}>
          <QuestionDisplay
            questionText={state.questionText}
            difficulty={config.difficulty}
          />
          <div className={styles.resultGrid}>
            <UserAnswerCard answer={state.answer} />
            <FeedbackDisplay
              ref={refs.contentEndRef}
              feedback={state.feedback}
              score={state.score}
              isLoading
            />
          </div>
        </div>
      </div>
    );
  }

  // 结果状态
  return (
    <div className={styles.container}>
      <WorkspaceHeader subtitle={t("subtitle.completed")} />
      <div className={styles.resultSection}>
        <QuestionDisplay
          questionText={state.questionText}
          difficulty={config.difficulty}
        />
        <div className={styles.resultGrid}>
          <UserAnswerCard answer={state.answer} />
          <FeedbackDisplay feedback={state.feedback} score={state.score} />
        </div>
        <button
          type="button"
          onClick={actions.resetWorkspace}
          className={styles.newQuestionButton}
        >
          <Sparkles className="w-4 h-4" />
          {t("actions.continue")}
        </button>
      </div>
    </div>
  );
}
