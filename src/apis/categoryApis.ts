import axiosInstance from '@/lib/axiosInstance';
import { CategoryParams } from '@/queries/category-query';
import urls from '@/utils/constants/urls';

const categoryApis = {
    getCategories: async (params: CategoryParams) => {
        try {
            const res = await axiosInstance.get(`${urls.categories}`, { params });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};

export default categoryApis;
