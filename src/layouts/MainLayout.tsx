import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[71px] min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
