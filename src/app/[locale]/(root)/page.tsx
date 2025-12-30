import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ToolsSection from '@/components/home/ToolsSection';
import FeaturesShowcase from '@/components/home/FeaturesShowcase';
import FAQSection from '@/components/home/FAQSection';
import { generateHomeMetadata } from './metadata';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: HomePageProps,
  parent: any
) {
  const { locale } = await params;
  return await generateHomeMetadata(locale, parent);
}

const pageStyles = {
  main: 'min-h-screen bg-[#0b081a]',
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className={pageStyles.main}>
      <HeroSection />
      <ToolsSection />
      <FeaturesShowcase />
      <FAQSection />
    </main>
  );
}
