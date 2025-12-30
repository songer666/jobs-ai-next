import { setRequestLocale } from 'next-intl/server';
import ResumeAnalyzerContentZh from '@/components/docs/zh-CN/ResumeAnalyzerContent';
import ResumeAnalyzerContentEn from '@/components/docs/en/ResumeAnalyzerContent';

interface ResumeAnalyzerPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ResumeAnalyzerPage({ params }: ResumeAnalyzerPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const ContentComponent = locale === 'zh-CN' ? ResumeAnalyzerContentZh : ResumeAnalyzerContentEn;

    return <ContentComponent />;
}