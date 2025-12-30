import { setRequestLocale } from 'next-intl/server';
import { GoalPositionForm } from '@/components/goal-position';

interface NewGoalPositionPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewGoalPositionPage({ params }: NewGoalPositionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GoalPositionForm mode="create" />;
}
