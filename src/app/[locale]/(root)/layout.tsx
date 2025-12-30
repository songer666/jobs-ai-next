'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
