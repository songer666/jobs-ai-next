import { setRequestLocale } from 'next-intl/server';
import PricingHero from '@/components/pricing/PricingHero';
import { generatePricingMetadata } from './metadata';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: PricingPageProps,
  parent: any
) {
  const { locale } = await params;
  return await generatePricingMetadata(locale, parent);
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0b081a]">
      <PricingHero />
    </main>
  );
}
