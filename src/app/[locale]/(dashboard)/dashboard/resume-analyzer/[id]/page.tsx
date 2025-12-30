import { setRequestLocale } from 'next-intl/server';
import { AnalysisDetailView } from '@/components/resume-analyzer';

interface AnalysisDetailPageProps {
    params: Promise<{ locale: string; id: string }>;
}

export default async function AnalysisDetailPage({ params }: AnalysisDetailPageProps) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    return <AnalysisDetailView analysisId={id} />;
}
