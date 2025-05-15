// src/utils/axiosInstance.ts
import axios from 'axios';

// Kiểm tra API URL
const apiUrl = import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_PUBLIC_API_URL;
if (!apiUrl) {
    console.warn('VITE_LOCAL_API_URL không được định nghĩa trong file .env!');
    console.warn('Sử dụng URL mặc định');
}

// Tạo instance riêng
const axiosInstance = axios.create({
    baseURL: apiUrl || 'https://api.example.com/api', // URL mặc định nếu không có trong .env
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
            console.log('Adding token to request', config.url);
        } else {
            console.warn('No token found in localStorage');
        }
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Xử lý lỗi phản hồi
axiosInstance.interceptors.response.use(
    response => {
        console.log('API response success:', response.config.url);
        return response;
    },
    error => {
        console.error('API response error:', error.response?.status, error.response?.data);

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
