"use client";

import { Loader2 } from "lucide-react";
import { workspaceStyles as styles } from "../styles";

interface GeneratingStateProps {
  generatedText: string;
}

export function GeneratingState({ generatedText }: GeneratingStateProps) {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultHeader}>
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-[#fd409a] animate-spin" />
          <span className={styles.resultTitle}>正在生成简历...</span>
        </div>
      </div>
      <div className={styles.resultContent}>
        {generatedText || "正在生成中，请稍候..."}
      </div>
    </div>
  );
}
