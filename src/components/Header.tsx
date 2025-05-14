import images from '@/assets/images';
import paths from '@/utils/constants/paths';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import {
    BookUser,
    Box,
    ChartBarStacked,
    ClipboardPlus,
    PackageOpen,
    PackageSearch,
    Settings,
    Truck,
    User,
} from 'lucide-react';
import { useState } from 'react';
function Header() {
    const [seletedPage, setSeletedPage] = useState<string>(paths.home);
    const pages = [
        {
            name: 'Trang chủ',
            path: paths.home,
            icon: <Box strokeWidth={1.5} />,
        },
        {
            name: 'Sản phẩm',
            path: paths.products,
            icon: <PackageSearch strokeWidth={1.5} />,
        },
        {
            name: 'Danh mục sản phẩm',
            path: paths.categories,
            icon: <ChartBarStacked strokeWidth={1.5} />,
        },
        {
            name: 'Đơn hàng',
            path: paths.orders,
            icon: <PackageOpen strokeWidth={1.5} />,
        },

        {
            name: 'Nhà cung cấp',
            path: paths.suppliers,
            icon: <Truck strokeWidth={1.5} />,
        },

        {
            name: 'Nhân viên',
            path: paths.employees,
            icon: <BookUser strokeWidth={1.5} />,
        },
        {
            name: 'Tài khoản',
            path: paths.account,
            icon: <Settings strokeWidth={1.5} />,
        },
        {
            name: 'Báo cáo',
            path: paths.report,
            icon: <ClipboardPlus strokeWidth={1.5} />,
        },
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
                />
                <ul className="items-center gap-[20px] lg:flex hidden">
                    {pages.map(page => (
                        <li key={page.path}>
                            <Link
                                to={page.path}
                                onClick={() => setSeletedPage(page.path)}
                                className={`text-[14px] text-[#737373] hover:text-black hover:duration-300 flex items-center gap-[10px] ${
                                    seletedPage === page.path ? 'text-black' : ''
                                }`}
                            >
                                {page.icon}
                                {page.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="size-[40px] rounded-full bg-slate-200 flex items-center justify-center cursor-pointer">
                    <User strokeWidth={1.5} />
                </div>
            </div>
        </header>
    );
}

export default Header;
