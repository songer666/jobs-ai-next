'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import SidebarNav from './SidebarNav';
import Logo from '@/components/common/Logo';

const styles = {
    // 桌面端侧边栏
    sidebar: 'bg-[#0d0a1f] border-r border-white/10 flex-col transition-all duration-300',
    sidebarExpanded: 'w-64',
    sidebarCollapsed: 'w-16',
    // 移动端覆盖层
    overlay: 'fixed inset-0 bg-black/50 z-40 md:hidden',
    mobileSidebar: 'fixed left-0 top-0 h-full w-64 bg-[#0d0a1f] border-r border-white/10 flex flex-col z-50 md:hidden',
    // Logo
    logo: {
        wrapper: 'p-6 border-b border-white/10 flex items-center justify-between',
        wrapperCollapsed: 'p-3 border-b border-white/10 flex justify-center',
        container: 'flex items-center gap-3',
        icon: 'w-8 h-8 flex-shrink-0',
        iconCollapsed: 'w-10 h-10 flex-shrink-0',
        text: 'text-2xl font-bold text-white',
        textCollapsed: 'text-xl font-bold text-white',
        highlight: 'gradient-text',
    },
    closeBtn: 'w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors md:hidden',
};

export default function Sidebar() {
    const { isCollapsed, setIsCollapsed } = useSidebar();

    return (
        <>
            {/* 移动端覆盖层 */}
            {!isCollapsed && (
                <div className={styles.overlay} onClick={() => setIsCollapsed(true)} />
            )}

            {/* 移动端侧边栏 */}
            {!isCollapsed && (
                <aside className={styles.mobileSidebar}>
                    <div className={styles.logo.wrapper}>
                        <Link href="/" className={styles.logo.container}>
                            <Logo size={32} />
                            <span className={styles.logo.text}>
                                Jobs <span className={styles.logo.highlight}>AI</span>
                            </span>
                        </Link>
                        <button onClick={() => setIsCollapsed(true)} className={styles.closeBtn}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <SidebarNav />
                </aside>
            )}

            {/* 桌面端侧边栏 */}
            <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded} hidden md:flex`}>
                <div className={isCollapsed ? styles.logo.wrapperCollapsed : styles.logo.wrapper}>
                    <Link href="/" className={isCollapsed ? styles.logo.wrapperCollapsed : styles.logo.container}>
                        {isCollapsed ? (
                            <Logo size={40} />
                        ) : (
                            <>
                                <Logo size={32} />
                                <span className={styles.logo.text}>
                                    Jobs <span className={styles.logo.highlight}>AI</span>
                                </span>
                            </>
                        )}
                    </Link>
                </div>
                <SidebarNav />
            </aside>
        </>
    );
}
