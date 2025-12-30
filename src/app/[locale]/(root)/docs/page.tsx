import { setRequestLocale } from 'next-intl/server';
import DocsContentZh from '@/components/docs/zh-CN/DocsContent';
import DocsContentEn from '@/components/docs/en/DocsContent';
import { generateDocsMetadata } from './metadata';

interface DocsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: DocsPageProps,
  parent: any
) {
  const { locale } = await params;
  return await generateDocsMetadata(locale, parent);
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ContentComponent = locale === 'zh-CN' ? DocsContentZh : DocsContentEn;

  return <ContentComponent />;
}
