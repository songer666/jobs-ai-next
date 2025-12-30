'use client';

import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useSidebar } from './SidebarContext';

const styles = {
    button: 'w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors',
    icon: 'w-5 h-5',
};

export default function SidebarToggle() {
    const { isCollapsed, toggle } = useSidebar();

    return (
        <button onClick={toggle} className={styles.button} aria-label="Toggle sidebar">
            {isCollapsed ? (
                <PanelLeft className={styles.icon} />
            ) : (
                <PanelLeftClose className={styles.icon} />
            )}
        </button>
    );
}
