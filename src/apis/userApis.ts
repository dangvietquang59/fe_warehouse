import axiosInstance from '@/lib/axiosInstance';
import urls from '@/utils/constants/urls';
const userApis = {
    getUsers: async () => {
        const response = await axiosInstance.get(`${urls.users}`);
        return response.data;
    },
};

export default userApis;
