import { Popover, Image } from 'antd';
import { useLanguageStore } from '@/stores/useLanguageStore';
import svgs from '@/assets/svgs';

const languageOptions = [
    { value: 'vn', label: 'Tiếng Việt', icon: svgs.vn },
    { value: 'en', label: 'English', icon: svgs.en },
    { value: 'zh', label: '中文', icon: svgs.tw },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore();
    const selectedLang = languageOptions.find(lang => lang.value === language);

    const content = (
        <div className="flex flex-col">
            {languageOptions.map(lang => (
                <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value as 'en' | 'vn' | 'zh')}
                    className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition ${
                        lang.value === language ? 'bg-gray-100' : ''
                    }`}
                >
                    <Image
                        src={lang.icon}
                        alt={lang.label}
                        width={20}
                        height={20}
                        preview={false}
                    />
                    <span>{lang.label}</span>
                </button>
            ))}
        </div>
    );

    return (
        <Popover content={content} trigger="click" placement="bottomRight">
            <div className="cursor-pointer rounded-full bg-slate-200 flex items-center justify-center p-[10px] hover:bg-slate-300 transition">
                <Image
                    src={selectedLang?.icon}
                    alt={selectedLang?.label}
                    width={24}
                    height={24}
                    preview={false}
                />
            </div>
        </Popover>
    );
}
