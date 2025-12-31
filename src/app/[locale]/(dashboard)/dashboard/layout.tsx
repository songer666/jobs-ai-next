"use client";

import { DashboardLayout as DashboardLayoutComponent } from "@/components/dashboard";
import { AuthGuard } from "@/components/common/AuthGuard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </AuthGuard>
  );
}
