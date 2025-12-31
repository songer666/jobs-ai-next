"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Eye, Trash2, Loader2 } from "lucide-react";
import { workspaceStyles as styles } from "../styles";
import {
  useDeleteResume,
  getStatusLabel,
  type Resume,
} from "@/api/resume-generator";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface ResumeListProps {
  resumes: Resume[] | undefined;
  isLoading: boolean;
}

export function ResumeList({ resumes, isLoading }: ResumeListProps) {
  const router = useRouter();
  const deleteResume = useDeleteResume();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);

  const handleDeleteClick = (resume: Resume) => {
    setResumeToDelete(resume);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (resumeToDelete) {
      deleteResume.mutate(resumeToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setResumeToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingSpinner}>
        <Loader2 className="w-8 h-8 text-[#fd409a] animate-spin" />
      </div>
    );
  }

  if (!resumes || resumes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FileText className={styles.emptyIcon} />
        <div className={styles.emptyTitle}>暂无简历</div>
        <div className={styles.emptyDesc}>
          点击上方按钮开始创建你的第一份 AI 简历
        </div>
      </div>
    );
  }

  const getStatusClass = (status: string | null) => {
    switch (status) {
      case "optimized":
        return styles.statusOptimized;
      case "generated":
        return styles.statusGenerated;
      default:
        return styles.statusDraft;
    }
  };

  return (
    <div className={styles.resumeList}>
      {resumes.map((resume) => (
        <div key={resume.id} className={styles.resumeCard}>
          <div className={styles.resumeCardHeader}>
            <div>
              <div className={styles.resumeCardTitle}>{resume.name}</div>
              <div className={styles.resumeCardDate}>
                {new Date(resume.createdAt).toLocaleDateString("zh-CN")}
              </div>
            </div>
            <span
              className={`${styles.statusBadge} ${getStatusClass(resume.status)}`}
            >
              {getStatusLabel(resume.status)}
            </span>
          </div>

          <div className={styles.resumeCardMeta}>
            {resume.stylePrompt && (
              <span className="text-white/50 text-xs truncate max-w-[200px]">
                样式已设置
              </span>
            )}
          </div>

          <div className={styles.resumeCardActions}>
            <button
              type="button"
              onClick={() =>
                router.push(`/dashboard/resume-generator/${resume.id}`)
              }
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg text-sm text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              查看
            </button>
            <button
              type="button"
              onClick={() => handleDeleteClick(resume)}
              disabled={deleteResume.isPending}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 rounded-lg text-sm text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              删除
            </button>
          </div>
        </div>
      ))}

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        itemName={resumeToDelete?.name}
        isDeleting={deleteResume.isPending}
      />
    </div>
  );
}
