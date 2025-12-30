'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCurrentSession, useLogout } from '@/api/auth';

const styles = {
  container: 'relative',
  avatar: {
    btn: 'flex items-center justify-center w-10 h-10 rounded-full bg-primary text-black font-bold text-sm border-2 border-white hover:opacity-90 transition-opacity cursor-pointer overflow-hidden',
    img: 'w-full h-full object-cover',
  },
  dropdown: {
    container: 'absolute right-0 top-full mt-2 w-48 rounded-xl bg-black/90 backdrop-blur-md border border-white/10 overflow-hidden z-50',
    header: 'px-4 py-3 border-b border-white/10',
    name: 'text-white font-medium text-sm truncate',
    email: 'text-white/60 text-xs truncate',
    menu: 'py-2',
    item: 'flex items-center gap-3 px-4 py-2.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm',
    divider: 'h-px bg-white/10 my-1',
    logout: 'flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm',
  },
};

export default function UserMenu() {
  const t = useTranslations('nav');
  const { data: session } = useCurrentSession();
  const logoutMutation = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const initials = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.avatar.btn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        {user.image ? (
          <img src={user.image} alt={user.name || ''} className={styles.avatar.img} />
        ) : (
          initials
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown.container}>
          <div className={styles.dropdown.header}>
            <p className={styles.dropdown.name}>{user.name || t('user')}</p>
            <p className={styles.dropdown.email}>{user.email}</p>
          </div>
          <div className={styles.dropdown.menu}>
            <Link
              href="/dashboard"
              className={styles.dropdown.item}
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{t('dashboard')}</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={styles.dropdown.item}
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t('settings')}</span>
            </Link>
            <div className={styles.dropdown.divider} />
            <button
              className={styles.dropdown.logout}
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
