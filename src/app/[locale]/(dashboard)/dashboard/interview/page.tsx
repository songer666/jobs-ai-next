import { setRequestLocale } from 'next-intl/server';
import { InterviewList } from '@/components/interview/InterviewList';

interface InterviewPageProps {
    params: Promise<{ locale: string }>;
}

export default async function InterviewPage({ params }: InterviewPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <InterviewList />;
}
