'use client';

import { useTranslations } from 'next-intl';
import { Tabs } from '@heroui/react';
import { Lock, User } from 'lucide-react';
import { ChangePasswordForm } from './ChangePasswordForm';
import { PersonalInfoForm } from './PersonalInfoForm';

export function SettingsTabs() {
    const t = useTranslations('settings');
    
    return (
        <Tabs defaultSelectedKey="personal" className="w-full">
            <Tabs.ListContainer>
                <Tabs.List aria-label={t('title')} className="w-full">
                    <Tabs.Tab id="personal" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t('tabs.personal')}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="security" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {t('tabs.security')}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            
            <Tabs.Panel id="personal" className="pt-6">
                <PersonalInfoForm />
            </Tabs.Panel>
            
            <Tabs.Panel id="security" className="pt-6">
                <ChangePasswordForm />
            </Tabs.Panel>
        </Tabs>
    );
}
