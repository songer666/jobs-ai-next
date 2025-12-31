"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Mic, Loader2 } from "lucide-react";
import { useGoalPositions } from "@/api/goal-position";
import {
  useCreateInterview,
  type InterviewLanguage,
  type AIModel,
} from "@/api/interview";

interface StartInterviewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const languageOptions: { value: InterviewLanguage; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
];

const modelOptions: { value: AIModel; label: string; desc: string }[] = [
  { value: "deepseek", label: "DeepSeek", desc: "国产模型 - 中文优化" },
];

const styles = {
  dialog: "sm:max-w-[500px] bg-[#1a1528] border border-white/10",
  header: "flex items-center gap-3 pb-4",
  iconWrapper:
    "w-12 h-12 rounded-full bg-gradient-to-r from-[#fd409a] to-[#f5a867] flex items-center justify-center",
  icon: "w-6 h-6 text-white",
  headerContent: "flex-1",
  heading: "text-xl font-semibold text-white",
  subheading: "text-sm text-white/60",
  body: "space-y-4",
  label: "block text-sm font-medium text-white/80 mb-2",
  select:
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50",
  option: "bg-[#1a1528] text-white",
  footer: "flex items-center justify-end gap-3 pt-6",
  cancelButton:
    "px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors",
  startButton:
    "px-6 py-2.5 gradient-btn text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
};

export function StartInterviewDialog({
  isOpen,
  onOpenChange,
}: StartInterviewDialogProps) {
  const t = useTranslations("interview");
  const { data: positions, isLoading: positionsLoading } =
    useGoalPositions(true);
  const createMutation = useCreateInterview();
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<InterviewLanguage>("zh");
  const [selectedModel, setSelectedModel] = useState<AIModel>("deepseek");

  const handleStart = async () => {
    if (!selectedJobId) return;

    await createMutation.mutateAsync({
      jobInfoId: selectedJobId,
      language: selectedLanguage,
      model: selectedModel,
    });
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className={styles.dialog}>
            <Modal.CloseTrigger />
            <div className={styles.header}>
              <div className={styles.iconWrapper}>
                <Mic className={styles.icon} />
              </div>
              <div className={styles.headerContent}>
                <h2 className={styles.heading}>{t("startDialog.title")}</h2>
                <p className={styles.subheading}>{t("startDialog.subtitle")}</p>
              </div>
            </div>

            <div className={styles.body}>
              <div>
                <label className={styles.label}>
                  {t("startDialog.selectPosition")}
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className={styles.select}
                  disabled={positionsLoading}
                >
                  <option value="" className={styles.option}>
                    {positionsLoading ? "加载中..." : "请选择目标职位"}
                  </option>
                  {positions?.map((pos) => (
                    <option
                      key={pos.id}
                      value={pos.id}
                      className={styles.option}
                    >
                      {pos.name} - {pos.title || pos.experienceLevel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={styles.label}>
                  {t("startDialog.selectLanguage")}
                </label>
                <div className="flex gap-3">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.value)}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                        selectedLanguage === lang.value
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={styles.label}>AI 模型</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                  className={styles.select}
                >
                  {modelOptions.map((model) => (
                    <option
                      key={model.value}
                      value={model.value}
                      className={styles.option}
                    >
                      {model.label} - {model.desc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={styles.cancelButton}
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleStart}
                disabled={!selectedJobId || createMutation.isPending}
                className={styles.startButton}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    创建中...
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    {t("startDialog.start")}
                  </>
                )}
              </button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
