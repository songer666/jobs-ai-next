"use client";

import { useTranslations } from "next-intl";
import { Mic, Plus } from "lucide-react";

interface InterviewEmptyProps {
  onStart?: () => void;
}

const styles = {
  container: "flex flex-col items-center justify-center py-16 px-4",
  iconWrapper:
    "w-20 h-20 rounded-full bg-gradient-to-r from-[#fd409a] to-[#f5a867] flex items-center justify-center mb-6",
  icon: "w-10 h-10 text-white",
  title: "text-xl font-semibold text-white mb-2",
  description: "text-white/60 text-center max-w-md mb-6",
  button:
    "flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium gradient-btn transition-all hover:scale-105",
  buttonIcon: "w-4 h-4",
};

export function InterviewEmpty({ onStart }: InterviewEmptyProps) {
  const t = useTranslations("interview");

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Mic className={styles.icon} />
      </div>
      <h2 className={styles.title}>{t("empty.title")}</h2>
      <p className={styles.description}>{t("empty.description")}</p>
      <button onClick={onStart} className={styles.button}>
        <Plus className={styles.buttonIcon} />
        {t("create")}
      </button>
    </div>
  );
}
