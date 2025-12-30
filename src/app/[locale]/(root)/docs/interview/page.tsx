import { setRequestLocale } from 'next-intl/server';
import InterviewContentZh from '@/components/docs/zh-CN/InterviewContent';
import InterviewContentEn from '@/components/docs/en/InterviewContent';

interface InterviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function InterviewPage({ params }: InterviewPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ContentComponent = locale === 'zh-CN' ? InterviewContentZh : InterviewContentEn;

  return <ContentComponent />;
}
