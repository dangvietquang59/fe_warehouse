import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
            <footer className="p-4 bg-gray-100 text-center">Footer</footer>
        </div>
    );
};

export default MainLayout;
