import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        // (có thể lấy từ localStorage, cookie, hoặc state management như Redux)
        const isAuthenticated = localStorage.getItem('auth_token');

        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        if (!isAuthenticated) {
            navigate('/auth/sign-in', { replace: true });
        }
        // Nếu đã đăng nhập, có thể chuyển hướng đến dashboard
        // else {
        //   navigate('/dashboard', { replace: true });
        // }
    }, [navigate]);
}
