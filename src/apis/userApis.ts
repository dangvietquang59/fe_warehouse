import axiosInstance from '@/lib/axiosInstance';
import { UserParams } from '@/queries/user-query';
import urls from '@/utils/constants/urls';
const userApis = {
    getUsers: async (params?: UserParams) => {
        try {
            const response = await axiosInstance.get(`${urls.users}`, {
                params,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default userApis;
