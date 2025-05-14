// src/utils/axiosInstance.ts
import axios from 'axios';

// Tạo instance riêng
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_API_URL, // ví dụ: http://localhost:3000/api
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gắn token vào mọi request nếu có
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // hoặc từ context nếu dùng auth
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Xử lý lỗi phản hồi
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Nếu token hết hạn hoặc lỗi 401/403
        if (error.response?.status === 401) {
            // Tự động logout hoặc chuyển hướng
            console.warn('Token hết hạn. Đăng xuất.');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
