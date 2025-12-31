"use client";

import { Loader2 } from "lucide-react";
import { useGoalPosition } from "@/api/goal-position";
import { GoalPositionForm } from "./GoalPositionForm";

interface GoalPositionEditProps {
  id: string;
}

const styles = {
  loading: "flex items-center justify-center py-16",
  error: "text-center py-16 text-red-400",
};

export function GoalPositionEdit({ id }: GoalPositionEditProps) {
  const { data: position, isLoading, error } = useGoalPosition(id);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !position) {
    return (
      <div className={styles.error}>
        {error?.message || "Position not found"}
      </div>
    );
  }

  return <GoalPositionForm position={position} mode="edit" />;
}
