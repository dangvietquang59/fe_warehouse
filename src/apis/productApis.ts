import axiosInstance from '@/lib/axiosInstance';
import urls from '@/utils/constants/urls';

const productApis = {
    getProducts: async () => {
        try {
            // Log thông tin trước khi gọi API
            console.log('Calling products API...');
            console.log('Token:', localStorage.getItem('token'));
            console.log('API URL:', import.meta.env.VITE_LOCAL_API_URL || 'Not defined');

            // Sửa lại đường dẫn, bỏ dấu / ở đầu
            const response = await axiosInstance.get(`${urls.products}`);
            return response.data;
        } catch (error) {
            // Log lỗi chi tiết
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};

export default productApis;
