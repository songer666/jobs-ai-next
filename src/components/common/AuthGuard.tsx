'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner } from '@heroui/react';
import { useCurrentSession } from "@/api/auth";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useCurrentSession();

  useEffect(() => {
    if (isPending) return;

    const isAuthenticated = !!session?.user;
    const isLoginPage = pathname.includes('/login');
    const isRegisterPage = pathname.includes('/register');
    const isForgotPasswordPage = pathname.includes('/forgot-password');
    const isAuthPage = isLoginPage || isRegisterPage || isForgotPasswordPage;

    if (requireAuth) {
      // 需要鉴权但未登录，跳转到登录页
      if (!isAuthenticated) {
        const locale = pathname.split('/')[1] || 'en';
        router.replace(`/${locale}/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    } else {
      // 不需要鉴权（登录页等），但已登录则跳转到 dashboard
      if (isAuthenticated && isAuthPage) {
        const locale = pathname.split('/')[1] || 'en';
        router.replace(`/${locale}/dashboard`);
      }
    }
  }, [session, isPending, router, pathname, requireAuth]);

  // 加载中显示 Spinner
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // 需要鉴权但未登录，不渲染内容
  if (requireAuth && !session?.user) {
    return null;
  }

  return <>{children}</>;
};
