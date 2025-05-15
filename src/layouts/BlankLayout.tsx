import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const BlankLayout = () => {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">Loading...</div>
            }
        >
            <Outlet />
        </Suspense>
    );
};

export default BlankLayout;
