'use client';

import { BarChart3 } from 'lucide-react';
import { analyzerStyles as styles } from '../styles';
import { useTranslations } from 'next-intl';

interface WorkspaceHeaderProps {
    title?: string;
    subtitle?: string;
}

export function WorkspaceHeader({ 
    title, 
    subtitle 
}: WorkspaceHeaderProps) {
    const t = useTranslations('resumeAnalyzer');
    
    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>
                <BarChart3 className="w-6 h-6 inline mr-2 text-[#fd409a]" />
                {title || t('title')}
            </h1>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
    );
}
