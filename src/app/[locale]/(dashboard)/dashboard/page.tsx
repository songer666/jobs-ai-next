import { setRequestLocale } from 'next-intl/server';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardOverview />;
}
