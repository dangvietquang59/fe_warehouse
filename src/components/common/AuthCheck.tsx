import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import paths from '@/utils/constants/paths';

// Component này sẽ kiểm tra nếu đã đăng nhập thì cho phép truy cập vào các routes được bảo vệ
// Nếu chưa đăng nhập thì chuyển hướng đến trang đăng nhập
export const RequireAuth = () => {
    // Kiểm tra token từ localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to={paths.login} replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập vào route con
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

// Component này sẽ kiểm tra nếu đã đăng nhập thì chuyển hướng đến trang home
// Nếu chưa đăng nhập thì cho phép truy cập vào các routes công khai (như đăng nhập, đăng ký)
export const RedirectIfAuth = () => {
    // Kiểm tra token từ localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
        // Nếu đã đăng nhập, chuyển hướng đến trang home
        return <Navigate to={paths.home} replace />;
    }

    // Nếu chưa đăng nhập, cho phép truy cập vào route con
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
