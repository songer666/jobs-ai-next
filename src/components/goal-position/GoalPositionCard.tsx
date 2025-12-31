"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Eye,
  Globe,
  Lock,
  Clock,
  Briefcase,
} from "lucide-react";
import type { GoalPosition } from "@/api/goal-position";

interface GoalPositionCardProps {
  position: GoalPosition;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const styles = {
  card: "bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors",
  header: "flex items-start justify-between mb-4",
  headerContent: "flex-1 min-w-0",
  title: "text-lg font-semibold text-white",
  subtitle: "text-sm text-white/60 mt-1",
  description: "text-sm text-white/70 line-clamp-2",
  badge: "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
  badgePublic: "bg-green-500/20 text-green-400",
  badgePrivate: "bg-white/10 text-white/60",
  badgeIcon: "w-3 h-3",
  meta: "flex flex-wrap gap-4 mt-4 text-sm text-white/60",
  metaItem: "flex items-center gap-1.5",
  metaIcon: "w-4 h-4",
  actions: "flex items-center gap-2 mt-4 pt-4 border-t border-white/10",
  viewButton:
    "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground text-sm font-semibold transition-all",
  viewButtonIcon: "w-4 h-4",
  iconButton:
    "p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors",
  editButton: "text-white/80 hover:text-white",
  editButtonIcon: "w-4 h-4",
  deleteButton: "text-red-400 hover:text-red-300",
  deleteButtonIcon: "w-4 h-4",
};

export function GoalPositionCard({
  position,
  onDelete,
  isDeleting,
}: GoalPositionCardProps) {
  const t = useTranslations("goalPosition");

  const formatDate = (date: string | number) => {
    return new Date(date).toLocaleDateString();
  };

  const getExperienceLevelLabel = (level: string) => {
    return t(`experienceLevel.${level}`);
  };

  // 判断是否为公开模板（公开且不属于当前用户）
  const isPublicTemplate = position.isPublic && position.isOwner === false;
  // 是否可编辑（属于当前用户）
  const canEdit = position.isOwner !== false;

  const handleDeleteClick = () => {
    onDelete?.(position.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{position.name}</h3>
          {position.title && (
            <p className={styles.subtitle}>{position.title}</p>
          )}
        </div>
        <span
          className={`${styles.badge} ${position.isPublic ? styles.badgePublic : styles.badgePrivate}`}
        >
          {position.isPublic ? (
            <>
              <Globe className={styles.badgeIcon} />
              {isPublicTemplate ? t("card.publicTemplate") : t("card.public")}
            </>
          ) : (
            <>
              <Lock className={styles.badgeIcon} />
              {t("card.private")}
            </>
          )}
        </span>
      </div>

      <p className={styles.description}>{position.description}</p>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Briefcase className={styles.metaIcon} />
          {getExperienceLevelLabel(position.experienceLevel)}
        </span>
        <span className={styles.metaItem}>
          <Clock className={styles.metaIcon} />
          {formatDate(position.createdAt)}
        </span>
      </div>

      <div className={styles.actions}>
        <Link
          href={`/dashboard/goal-position/${position.id}`}
          className={styles.viewButton}
        >
          <Eye className={styles.viewButtonIcon} />
          {t("view")}
        </Link>
        {canEdit && (
          <>
            <Link
              href={`/dashboard/goal-position/${position.id}/edit`}
              className={`${styles.iconButton} ${styles.editButton}`}
            >
              <Pencil className={styles.editButtonIcon} />
            </Link>
            <button
              type="button"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className={`${styles.iconButton} ${styles.deleteButton}`}
            >
              <Trash2 className={styles.deleteButtonIcon} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
