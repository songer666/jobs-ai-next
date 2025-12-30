import { setRequestLocale } from 'next-intl/server';
import { InterviewSessionWrapper } from './InterviewSessionWrapper';

interface InterviewSessionPageProps {
    params: Promise<{ locale: string; id: string }>;
}

export default async function InterviewSessionPage({ params }: InterviewSessionPageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    return <InterviewSessionWrapper interviewId={id} />;
}
