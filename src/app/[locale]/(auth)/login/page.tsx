import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LoginForm } from '@/components/auth';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

const styles = {
  wrapper: 'w-full max-w-md',
  card: 'glass-card p-8 rounded-3xl',
  header: {
    wrapper: 'text-center mb-8',
    title: 'text-2xl font-bold text-white mb-2',
    subtitle: 'text-white/60',
  },
  back: 'text-center mt-6',
  backLink: 'text-white/40 text-sm hover:text-white/60 transition-colors',
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('auth');

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header.wrapper}>
          <h2 className={styles.header.title}>{t('loginTitle')}</h2>
          <p className={styles.header.subtitle}>{t('loginSubtitle')}</p>
        </div>

        <LoginForm />
      </div>

      <div className={styles.back}>
        <Link href="/" className={styles.backLink}>
          ← {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
