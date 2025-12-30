import { setRequestLocale } from 'next-intl/server';
import ResumeGeneratorContentZh from '@/components/docs/zh-CN/ResumeGeneratorContent';
import ResumeGeneratorContentEn from '@/components/docs/en/ResumeGeneratorContent';

interface ResumeGeneratorPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ResumeGeneratorPage({ params }: ResumeGeneratorPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const ContentComponent = locale === 'zh-CN' ? ResumeGeneratorContentZh : ResumeGeneratorContentEn;

    return <ContentComponent />;
}