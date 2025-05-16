import axiosInstance from '@/lib/axiosInstance';
import { ProductParams } from '@/queries/product-query';
import urls from '@/utils/constants/urls';

const productApis = {
    getProducts: async (params: ProductParams) => {
        try {
            const response = await axiosInstance.get(`${urls.products}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
};

export default productApis;
