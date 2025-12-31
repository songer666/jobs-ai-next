"use client";

import { AlertDialog } from "@heroui/react";
import { AlertCircle } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  itemName?: string;
  isDeleting?: boolean;
}

const styles = {
  dialog: "sm:max-w-[500px] bg-[#2a2a2a] border border-white/10",
  header: "flex items-start gap-4 pb-4",
  iconWrapper:
    "flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center",
  icon: "w-6 h-6 text-red-500",
  headerContent: "flex-1",
  heading: "text-xl font-semibold text-white mb-2",
  body: "text-white/70 leading-relaxed",
  highlight: "text-white font-medium",
  footer: "flex items-center justify-end gap-3 pt-6",
  cancelButton:
    "px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors",
  deleteButton:
    "px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium",
};

export function DeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  itemName,
  isDeleting,
}: DeleteConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className={styles.dialog}>
            <AlertDialog.CloseTrigger />
            <div className={styles.header}>
              <div className={styles.iconWrapper}>
                <AlertCircle className={styles.icon} />
              </div>
              <div className={styles.headerContent}>
                <h2 className={styles.heading}>确认删除</h2>
                <p className={styles.body}>
                  {itemName ? (
                    <>
                      确定要永久删除{" "}
                      <span className={styles.highlight}>{itemName}</span>{" "}
                      吗？此操作无法撤销。
                    </>
                  ) : (
                    <>确定要永久删除这份简历吗？此操作无法撤销。</>
                  )}
                </p>
              </div>
            </div>
            <div className={styles.footer}>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={styles.cancelButton}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isDeleting}
                className={styles.deleteButton}
              >
                {isDeleting ? "删除中..." : "删除"}
              </button>
            </div>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
