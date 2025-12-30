'use client';

import { RefObject } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { analyzerStyles as styles } from '../styles';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface FileUploaderProps {
    selectedFile: File | null;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onFileSelect: (file: File | null) => void;
    onRemove: () => void;
    disabled?: boolean;
}

export function FileUploader({
    selectedFile,
    fileInputRef,
    onFileSelect,
    onRemove,
    disabled,
}: FileUploaderProps) {
    const t = useTranslations('resumeAnalyzer');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            onFileSelect(null);
            return;
        }

        // 验证文件大小
        if (file.size > 10 * 1024 * 1024) {
            toast.error(t('validation.fileTooLarge'));
            if (e.target) {
                e.target.value = '';
            }
            return;
        }

        onFileSelect(file);
        toast.success(t('validation.fileSelected'));
    };

    if (selectedFile) {
        return (
            <div className={styles.filePreview}>
                <FileText className={styles.fileIcon} />
                <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{selectedFile.name}</div>
                    <div className={styles.fileSize}>
                        {(selectedFile.size / 1024).toFixed(1)} KB
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    disabled={disabled}
                    className={styles.fileRemove}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />
            <div
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadZone}
            >
                <Upload className={styles.uploadIcon} />
                <div className={styles.uploadText}>{t('upload.clickToUpload')}</div>
                <div className={styles.uploadHint}>支持 PDF、Word (.doc/.docx)、TXT 格式，最大 10MB</div>
            </div>
        </>
    );
}
