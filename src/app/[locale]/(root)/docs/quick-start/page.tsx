import { setRequestLocale } from 'next-intl/server';
import QuickStartContentZh from '@/components/docs/zh-CN/QuickStartContent';
import QuickStartContentEn from '@/components/docs/en/QuickStartContent';

interface QuickStartPageProps {
    params: Promise<{ locale: string }>;
}

export default async function QuickStartPage({ params }: QuickStartPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const ContentComponent = locale === 'zh-CN' ? QuickStartContentZh : QuickStartContentEn;

    return <ContentComponent />;
}