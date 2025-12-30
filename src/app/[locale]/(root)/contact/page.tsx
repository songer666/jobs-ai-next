import { setRequestLocale } from 'next-intl/server';
import ContactHero from '@/components/contact/ContactHero';
import { generateContactMetadata } from './metadata';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: ContactPageProps,
  parent: any
) {
  const { locale } = await params;
  return await generateContactMetadata(locale, parent);
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0b081a]">
      <ContactHero />
    </main>
  );
}
