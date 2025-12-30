'use client';

import { ReactNode } from 'react';
import { SidebarProvider, Sidebar } from './sidebar';
import { Header } from './header';

const styles = {
    wrapper: 'min-h-screen bg-[#0b081a] flex',
    main: 'flex-1 flex flex-col',
    content: 'flex-1 p-4 sm:p-6 overflow-auto',
};

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className={styles.wrapper}>
                <Sidebar />
                <div className={styles.main}>
                    <Header />
                    <main className={styles.content}>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
