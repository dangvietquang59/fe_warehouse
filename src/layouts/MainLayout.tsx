import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="bg-gray-100">
                <main className="flex-1 p-4 mt-[71px] min-h-screen max-w-[1440px] mx-auto w-full">
                    <Suspense
                        fallback={
                            <div className="flex h-full w-full items-center justify-center min-h-[500px]">
                                <Spin />
                            </div>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
