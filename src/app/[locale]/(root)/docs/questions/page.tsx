import { setRequestLocale } from 'next-intl/server';
import QuestionsContentZh from '@/components/docs/zh-CN/QuestionsContent';
import QuestionsContentEn from '@/components/docs/en/QuestionsContent';

interface QuestionsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function QuestionsPage({ params }: QuestionsPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const ContentComponent = locale === 'zh-CN' ? QuestionsContentZh : QuestionsContentEn;

    return <ContentComponent />;
}