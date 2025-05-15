'use client';

import { Dropdown, Image, MenuProps } from 'antd';
import { User, LogOut, Globe } from 'lucide-react';
import svgs from '@/assets/svgs';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';
import paths from '@/utils/constants/paths';
import { useNavigate } from 'react-router-dom';
const languageOptions = [
    { value: 'vn', label: 'Tiếng Việt', icon: svgs.vn },
    { value: 'en', label: 'English', icon: svgs.en },
    { value: 'zh', label: '中文', icon: svgs.tw },
];

export default function UserMenu() {
    const { language, setLanguage } = useLanguageStore();
    const { t } = useTranslationCustom();
    const navigate = useNavigate();
    const selectedLang = languageOptions.find(lang => lang.value === language);
    const handleLogout = () => {
        localStorage.clear();
        navigate(paths.login);
    };

    const menuItems = [
        {
            key: 'profile',
            label: (
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{t.userHeader.profile}</span>
                </div>
            ),
        },
        {
            key: 'language',
            label: (
                <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{t.userHeader.language}</span>
                    <Image
                        src={selectedLang?.icon}
                        alt="lang"
                        width={16}
                        preview={false}
                        className="ml-auto"
                    />
                </div>
            ),
            children: languageOptions.map(lang => ({
                key: lang.value,
                label: (
                    <div className="flex items-center gap-2">
                        <Image src={lang.icon} width={16} preview={false} />
                        <span>{lang.label}</span>
                    </div>
                ),
                onClick: () => setLanguage(lang.value as 'en' | 'vn' | 'zh'),
            })),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <div className="flex items-center gap-2">
                    <LogOut size={16} />
                    <span>{t.userHeader.logout}</span>
                </div>
            ),
            danger: true,
            onClick: () => {
                handleLogout();
            },
        },
    ];
    return (
        <Dropdown
            menu={{ items: menuItems as MenuProps['items'] }}
            trigger={['click']}
            placement="bottomRight"
            arrow
        >
            <div className="size-[40px] rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-300 transition">
                <User strokeWidth={1.5} size={20} />
            </div>
        </Dropdown>
    );
}
