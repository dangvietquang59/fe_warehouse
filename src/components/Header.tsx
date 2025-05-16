import images from '@/assets/images';
import paths from '@/utils/constants/paths';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { BookUser, Box, ChartBarStacked, PackageOpen, PackageSearch, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import { useTranslationCustom } from '@/utils/hooks/useTranslationCustom';

function Header() {
    const [selectedPage, setSelectedPage] = useState<string>(() => {
        return localStorage.getItem('page') || paths.home;
    });
    const { t } = useTranslationCustom();
    useEffect(() => {
        localStorage.setItem('page', selectedPage);
    }, [selectedPage]);
    const pages = [
        {
            name: t.page.home,
            path: paths.home,
            icon: <Box strokeWidth={1.5} />,
        },
        {
            name: t.page.products,
            path: paths.products,
            icon: <PackageSearch strokeWidth={1.5} />,
        },
        {
            name: t.page.categories,
            path: paths.categories,
            icon: <ChartBarStacked strokeWidth={1.5} />,
        },
        {
            name: t.page.orders,
            path: paths.orders,
            icon: <PackageOpen strokeWidth={1.5} />,
        },

        {
            name: t.page.suppliers,
            path: paths.suppliers,
            icon: <Truck strokeWidth={1.5} />,
        },

        {
            name: t.page.employees,
            path: paths.employees,
            icon: <BookUser strokeWidth={1.5} />,
        },

        // {
        //     name: t.page.reports,
        //     path: paths.report,
        //     icon: <ClipboardPlus strokeWidth={1.5} />,
        // },
    ];
    return (
        <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-[10px] max-w-[1440px] mx-auto">
                <Image
                    src={images.logo}
                    alt="logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                    preview={false}
                />
                <ul className="items-center gap-[30px] lg:flex hidden">
                    {pages.map(page => (
                        <li key={page.path}>
                            <Link
                                to={page.path}
                                onClick={() => setSelectedPage(page.path)}
                                className={`text-[14px] text-[#737373] hover:text-green-700 hover:duration-300 flex items-center gap-[10px] ${
                                    selectedPage === page.path
                                        ? 'text-green-700 font-bold hover:text-green-700'
                                        : ''
                                }`}
                            >
                                {page.icon}
                                {page.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-[10px]">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
