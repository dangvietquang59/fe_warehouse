import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
const BlankLayout = () => {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spin />
                </div>
            }
        >
            <Outlet />
        </Suspense>
    );
};

export default BlankLayout;
