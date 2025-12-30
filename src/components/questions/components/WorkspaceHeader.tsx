'use client';

import { workspaceStyles as styles } from '../styles/workspace';
import { useTranslations } from 'next-intl';

interface WorkspaceHeaderProps {
    title?: string;
    subtitle: string;
}

export function WorkspaceHeader({ 
    title, 
    subtitle 
}: WorkspaceHeaderProps) {
    const t = useTranslations('questions');
    
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title || t('title')}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    );
}
