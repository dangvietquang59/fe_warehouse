'use client';

import svgs from '@/assets/svgs';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { Image, Select } from 'antd';

const languageOptions = [
    { value: 'vn', label: 'Tiếng Việt', icon: svgs.vn },
    { value: 'en', label: 'English', icon: svgs.en },
    { value: 'zh', label: '中文', icon: svgs.tw },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore();

    return (
        <div className="flex items-center gap-4">
            <Select
                value={language}
                onChange={setLanguage}
                style={{ width: 150 }}
                options={languageOptions.map(lang => ({
                    value: lang.value,
                    label: (
                        <div className="flex items-center gap-2">
                            <Image
                                src={lang.icon}
                                alt={lang.label}
                                width={20}
                                height={20}
                                preview={false}
                            />
                            <span>{lang.label}</span>
                        </div>
                    ),
                }))}
                dropdownStyle={{ minWidth: 150 }}
            />
        </div>
    );
}
