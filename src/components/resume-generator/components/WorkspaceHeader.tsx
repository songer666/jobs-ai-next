'use client';

import { Sparkles } from 'lucide-react';
import { workspaceStyles as styles } from '../styles';
import { useTranslations } from 'next-intl';

interface WorkspaceHeaderProps {
    title?: string;
    subtitle?: string;
}

export function WorkspaceHeader({ 
    title, 
    subtitle 
}: WorkspaceHeaderProps) {
    const t = useTranslations('resumeGenerator');
    
    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>
                <Sparkles className="w-6 h-6 inline mr-2 text-[#fd409a]" />
                {title || t('title')}
            </h1>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
    );
}
