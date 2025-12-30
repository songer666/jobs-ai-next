import { setRequestLocale } from 'next-intl/server';
import { QuestionDetail } from '@/components/questions/QuestionDetail';

interface QuestionDetailPageProps {
    params: Promise<{ locale: string; id: string }>;
}

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    return <QuestionDetail questionId={id} />;
}
